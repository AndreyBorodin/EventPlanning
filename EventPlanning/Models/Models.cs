using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventPlanning.Models
{
    public class Message
    {
        public string type { get; set; }
        public int timerOne { get; set; }
        public int timerTwo { get; set; }
        public int currently { get; set; }

    }
    public class User
    {
        public string id { get; set; }
        public string userName { get; set; }
        public string login { get; set; }
        public string password { get; set; }
    }
    public class EventPlan
    {
        public string id { get; set; }
        public string name { get; set; }
    }
    public class FirstVote 
    {
        public string id { get; set; }
        public string idUser { get; set; }
        public string idEventsPlan { get; set; }
        public bool consent { get; set; }
    }
    public class FirstVoteDTO
    {
        public string id { get; set; }
        public string idUser { get; set; }
        public string idEventsPlan { get; set; }
        public string name { get; set; }
        public bool consent { get; set; }
    }
    public class SecondVote 
    {
        public string id { get; set; }
        public string idUser { get; set; }
        public bool consent { get; set; }
    }
    public static class ResultsInfo
    {
        public static List<User> users = new List<User>();
        public static List<EventPlan> eventPlans = new List<EventPlan>();
        public static List<FirstVote> firstVote = new List<FirstVote>();
        public static List<SecondVote> secondVote = new List<SecondVote>();
        public static EventPlan leaderPlan = new EventPlan();
        public static int phase = 2;
    }
}
