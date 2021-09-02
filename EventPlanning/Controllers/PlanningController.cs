using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventPlanning;
using EventPlanning.Models;

namespace EventPlanning.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlanningController : Controller
    {

        [HttpPost]
        [Route("login")]
        public JsonResult Login(User user)
        {
            User userBD = ResultsInfo.users.Where(x => x.password == user.password && x.login == user.login).FirstOrDefault();

            return new JsonResult(userBD);
        }
        [HttpPost]
        [Route("addUser")]
        public JsonResult AddUser(User user)
        {
            user.id = Guid.NewGuid().ToString();
            ResultsInfo.users.Add(user);

            return new JsonResult(user);
        }
        [HttpPost]
        [Route("getPhase")]
        public JsonResult GetPhase(User item)
        {
            int phase = 2;
            if (ResultsInfo.phase == 3)
            {
                phase = 3;
                foreach (var vote in ResultsInfo.firstVote)
                {
                    if (vote.userId == item.id)
                    {
                        phase = 4;
                    }
                }
            }
            if (ResultsInfo.phase == 5)
            {
                phase = 5;
                foreach (var vote in ResultsInfo.secondVote)
                {
                    if (vote.userId == item.id)
                    {
                        phase = 6;
                    }
                }
            }

                return new JsonResult(phase);
        }
        [HttpPost]
        [Route("startVote")]
        public JsonResult StartVote(List<EventPlan> startVote)
        {
            ResultsInfo.firstVote = new List<FirstVote>();
            ResultsInfo.leaderPlan = new EventPlan();
            ResultsInfo.secondVote = new List<SecondVote>();
            foreach (var item in startVote)
            {
                item.id = Guid.NewGuid().ToString();
                ResultsInfo.eventPlans.Add(item);
            }
            ResultsInfo.phase = 3;
            return new JsonResult(true);
        }
        [HttpGet]
        [Route("getFirstVote")]
        public JsonResult GetFirstVote()
        {
            List<FirstVoteDTO> firstVotes = new List<FirstVoteDTO>();
            foreach (var item in ResultsInfo.eventPlans)
            {
                FirstVoteDTO firstVote = new FirstVoteDTO();
                firstVote.eventPlanId = item.id;
                firstVote.name = item.name;
                firstVotes.Add(firstVote);
            }
            return new JsonResult(firstVotes);
        }
        [HttpPost]
        [Route("addVoteOne")]
        public JsonResult AddVoteOne(List<FirstVoteDTO> items)
        {
            foreach (var item in items)
            {

                if (item.eventPlanId == null)
                {
                    EventPlan planNew = new EventPlan();
                    planNew.id = Guid.NewGuid().ToString();
                    planNew.name = item.name;
                    ResultsInfo.eventPlans.Add(planNew);
                    item.eventPlanId = planNew.id;
                }
                if (item.consent)
                {
                    FirstVote firstVote = new FirstVote();
                    firstVote.id = Guid.NewGuid().ToString();
                    firstVote.userId = item.userId;
                    firstVote.eventPlanId = item.eventPlanId;
                    ResultsInfo.firstVote.Add(firstVote);
                }
            }

            return new JsonResult(true);
        }
        [HttpPost]
        [Route("addVoteTwo")]
        public JsonResult AddVoteTwo(SecondVote item)
        {
            ResultsInfo.secondVote.Add(item);
            return new JsonResult(true);
        }
        [HttpGet]
        [Route("getPlanLeader")]
        public JsonResult GetPlanLider()
        {
            return new JsonResult(ResultsInfo.leaderPlan);
        }
        [HttpGet]
        [Route("getListParty")]
        public JsonResult GetListParty()
        {
            var listParty = "";
            foreach (var item in ResultsInfo.firstVote)
            {
                if (item.eventPlanId == ResultsInfo.leaderPlan.id)
                {
                    listParty += ResultsInfo.users.Where(x => x.id == item.userId).FirstOrDefault().userName + "; ";
                }
                
            }
            return new JsonResult(listParty);
        }
        [HttpGet]
        [Route("getListParty2")]
        public JsonResult GetListParty2()
        {
            var listParty = "";
            foreach (var item in ResultsInfo.secondVote)
            {
                if (item.consent)
                {
                    listParty += ResultsInfo.users.Where(x => x.id == item.userId).FirstOrDefault().userName + "; ";
                }
            }
            return new JsonResult(listParty);
        }
        [HttpGet]
        [Route("getCountVoted")]
        public JsonResult GetCountVoted()
        {
            int countVoted = 0;
            foreach (var item in ResultsInfo.users)
            {
                var countV = ResultsInfo.firstVote.Where(x => x.userId == item.id).Count();
                if(countV > 0) { countVoted++; }
            }
            return new JsonResult(countVoted);
        }
    }
}
