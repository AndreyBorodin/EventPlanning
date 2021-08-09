using EventPlanning.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Threading;
using System.Timers;
using System.Diagnostics;
using System;
using EventPlanning.Controllers;
using System.Linq;
using System.Collections.Generic;

namespace EventPlanning.Hubs
{
    public class MessageHub : Hub
    {
        public async Task NewMessage(Message msg)
        {
            msg.type = "messege";
            await Clients.All.SendAsync("MessageReceived", msg);
        }
        public async Task StartTimer(Message msg)
        {
            msg.type = "messege";
            await Clients.All.SendAsync("MessageReceived", msg);
            int timerOne = msg.timerOne;
            int countOne = ResultsInfo.firstVote.Count();
            for (int i = 0; i <= timerOne; i++)
            {
                Thread.Sleep(1000);
                msg.type = "timerOne";
                msg.currently = msg.timerOne - i;
                if (msg.currently == 0)
                {
                    ResultsInfo.phase = 5;
                    var countP = 0;
                    foreach (var item in ResultsInfo.eventPlans)
                    {
                        var countNew = ResultsInfo.firstVote.Where(x => x.idEventsPlan == item.id).Count();
                        if (countNew > countP)
                        {
                            countP = countNew;
                            ResultsInfo.leaderPlan = item;
                        }
                    }
                    msg.type = "messege";
                }
                await Clients.All.SendAsync("MessageReceived", msg);
                if(countOne < ResultsInfo.firstVote.Count())
                {
                    countOne = ResultsInfo.firstVote.Count();
                    msg.type = "messege";
                    await Clients.All.SendAsync("MessageReceived", msg);
                }
            }
            int timerTwo = msg.timerTwo;
            int countTwo = ResultsInfo.secondVote.Count();
            for (int i = 0; i <= timerTwo; i++)
            {
                Thread.Sleep(1000);
                msg.type = "timerTwo";
                msg.currently = msg.timerTwo - i;
                if (msg.currently == 0)
                {
                    ResultsInfo.phase = 2;
                    ResultsInfo.eventPlans = new List<EventPlan>();
                    msg.type = "messege";
                }
                await Clients.All.SendAsync("MessageReceived", msg);
                if (countTwo < ResultsInfo.secondVote.Count())
                {
                    countTwo = ResultsInfo.secondVote.Count();
                    msg.type = "messege";
                    await Clients.All.SendAsync("MessageReceived", msg);
                }
            }
        }
    }
}
