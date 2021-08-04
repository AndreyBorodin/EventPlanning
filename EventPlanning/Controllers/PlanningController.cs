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
        public JsonResult Login(User item)
        {
            User Item = ResultsInfo.users.Where(x => x.password == item.password && x.login == item.login).FirstOrDefault();

            return new JsonResult(Item);
        }
        [HttpPost]
        [Route("addUser")]
        public JsonResult AddUser(User item)
        {
            item.id = Guid.NewGuid().ToString();
            ResultsInfo.users.Add(item);

            return new JsonResult(item);
        }
        [HttpPost]
        [Route("getFaza")]
        public JsonResult GetFaza(User item)
        {
            int faza = 2;
            if (ResultsInfo.faza == 3)
            {
                faza = 3;
                foreach (var vote in ResultsInfo.firstVote)
                {
                    if (vote.idUserName == item.id)
                    {
                        faza = 4;
                    }
                }
            }
            if (ResultsInfo.faza == 5)
            {
                faza = 5;
                foreach (var vote in ResultsInfo.secondVote)
                {
                    if (vote.idUserName == item.id)
                    {
                        faza = 6;
                    }
                }
            }

                return new JsonResult(faza);
        }
        [HttpPost]
        [Route("startVote")]
        public JsonResult StartVote(StartVote startVote)
        {
            ResultsInfo.timeFazaOne = startVote.timeFazaOne;
            ResultsInfo.timeFazaTwo = startVote.timeFazaTwo;
            ResultsInfo.firstVote = new List<FirstVote>();
            ResultsInfo.liderPlan = new EventPlan();
            ResultsInfo.secondVote = new List<SecondVote>();
            foreach (var item in startVote.eventPlans)
            {
                item.id = Guid.NewGuid().ToString();
                ResultsInfo.eventPlan.Add(item);
            }
            ResultsInfo.faza = 3;

            return new JsonResult(true);
        }
        [HttpGet]
        [Route("setFaza2")]
        public JsonResult setFaza2()
        {
            ResultsInfo.faza = 2;
            ResultsInfo.eventPlan = new List<EventPlan>();
            return new JsonResult(true);
        }
        [HttpGet]
        [Route("setFaza5")]
        public JsonResult setFaza5()
        {
            ResultsInfo.faza = 5;
            var countP = 0;
            foreach (var item in ResultsInfo.eventPlan)
            {
                var countNew = ResultsInfo.firstVote.Where(x => x.idEventsPlan == item.id).Count();
                if(countNew > countP)
                {
                    countP = countNew;
                    ResultsInfo.liderPlan = item;
                }
            }
            return new JsonResult(true);
        }
        [HttpGet]
        [Route("getFirstVote")]
        public JsonResult GetFirstVote()
        {
            List<FirstVoteDTO> firstVotes = new List<FirstVoteDTO>();
            foreach (var item in ResultsInfo.eventPlan)
            {
                FirstVoteDTO firstVote = new FirstVoteDTO();
                firstVote.idEventsPlan = item.id;
                firstVote.name = item.name;
                firstVotes.Add(firstVote);
            }
            return new JsonResult(firstVotes);
        }
        [HttpGet]
        [Route("getTimeOne")]
        public JsonResult GetTimeOne()
        {
            return new JsonResult(ResultsInfo.timeFazaOne);
        }
        [HttpGet]
        [Route("getTimeTwo")]
        public JsonResult GetTimeTwo()
        {
            return new JsonResult(ResultsInfo.timeFazaTwo);
        }
        [HttpPost]
        [Route("givetVote")]
        public JsonResult GivetVote(List<FirstVoteDTO> items)
        {
            foreach (var item in items)
            {

                if (item.idEventsPlan == null)
                {
                    EventPlan planNew = new EventPlan();
                    planNew.id = Guid.NewGuid().ToString();
                    planNew.name = item.name;
                    ResultsInfo.eventPlan.Add(planNew);
                    item.idEventsPlan = planNew.id;
                }
                if (item.consent)
                {
                    FirstVote firstVote = new FirstVote();
                    firstVote.id = Guid.NewGuid().ToString();
                    firstVote.idUserName = item.idUserName;
                    firstVote.idEventsPlan = item.idEventsPlan;
                    ResultsInfo.firstVote.Add(firstVote);
                }
            }

            return new JsonResult(true);
        }
        [HttpPost]
        [Route("givetVote2")]
        public JsonResult GivetVote2(SecondVote item)
        {
            ResultsInfo.secondVote.Add(item);
            return new JsonResult(true);
        }
        [HttpGet]
        [Route("getPlanLider")]
        public JsonResult GetPlanLider()
        {
            return new JsonResult(ResultsInfo.liderPlan);
        }
        [HttpGet]
        [Route("getListParty")]
        public JsonResult GetListParty()
        {
            var listParty = "";
            foreach (var item in ResultsInfo.firstVote)
            {
                if (item.idEventsPlan == ResultsInfo.liderPlan.id)
                {
                    listParty += ResultsInfo.users.Where(x => x.id == item.idUserName).FirstOrDefault().userName + "; ";
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
                    listParty += ResultsInfo.users.Where(x => x.id == item.idUserName).FirstOrDefault().userName + "; ";
                }
            }
            return new JsonResult(listParty);
        }
    }
}
