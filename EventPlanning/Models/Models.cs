using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventPlanning.Models
{
    public class Message
    {
        public string clientuniqueid { get; set; }
        public string type { get; set; }
        public List<string> message { get; set; }
        public DateTime date { get; set; }
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
        public string idUserName { get; set; }
        public string idEventsPlan { get; set; }
        public bool consent { get; set; }
    }
    public class FirstVoteDTO
    {
        public string id { get; set; }
        public string idUserName { get; set; }
        public string idEventsPlan { get; set; }
        public string name { get; set; }
        public bool consent { get; set; }
    }
    public class SecondVote 
    {
        public string id { get; set; }
        public string idUserName { get; set; }
        public bool consent { get; set; }
    }
    public static class ResultsInfo
    {
        public static List<User> users = new List<User>();
        public static List<EventPlan> eventPlan = new List<EventPlan>();
        public static List<FirstVote> firstVote = new List<FirstVote>();
        public static List<SecondVote> secondVote = new List<SecondVote>();
        public static EventPlan liderPlan = new EventPlan();
        public static int faza = 2;
        public static int timeFazaOne = 5;
        public static int timeFazaTwo = 5;
    }
    public class StartVote
    {
        public  List<EventPlan> eventPlans { get; set; }
        public  int timeFazaOne { get; set; }
        public  int timeFazaTwo { get; set; }
    }
}
