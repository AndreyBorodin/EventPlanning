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

    }
    public class StartTimerHub : Hub
    {
        public async Task StartTimer(Message msg)
        {
            msg.type = "messege";
            await Clients.All.SendAsync("MessageReceived", msg);
            int timerOne = msg.timerOne;
            for (int i = 0; i <= timerOne; i++)
            {
                Thread.Sleep(1000);
                msg.type = "timerOne";
                msg.currently = msg.timerOne - i;
                if (msg.currently == 0)
                {
                    ResultsInfo.EndVotingOne();
                    
                    msg.type = "messege";
                }
                await Clients.All.SendAsync("MessageReceived", msg);
            }
            int timerTwo = msg.timerTwo;
            for (int i = 0; i <= timerTwo; i++)
            {
                Thread.Sleep(1000);
                msg.type = "timerTwo";
                msg.currently = msg.timerTwo - i;
                if (msg.currently == 0)
                {
                    ResultsInfo.EndVotingTwo();
                    msg.type = "messege";
                }
                await Clients.All.SendAsync("MessageReceived", msg);
            }
        }
    }
}
