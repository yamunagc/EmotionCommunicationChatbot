async function runChat(prompt) {
    const fakeResponses = [
      "AI is the simulation of human intelligence by machines.Artificial Intelligence helps machines think and learnArtificial Intelligence helps machines think and learn,Artificial Intelligence helps machines think and learn",
      "ArtificialArtificial Intelligence helps machines think and learn IntelligenceArtificial Intelligence helps machines think and learn helpsArtificial Intelligence helps machines think and learn machines think and learn.",
      "I'm heading back to Colorado tomorrow after being down in Santa Barbara over the weekend for the festival there. I will be making October plans once there and will try to arrange so I'm back here for the birthday if possible. I'll let you know as soon as I know the doctor's appointment schedule and my flight plans.",
      "She's asked the question so many times that she barely listened to the answers anymore. The answers were always the same. Well, not exactly the same, but the same in a general sense. A more accurate description was the answers never surprised her. So, she asked for the 10,000th time, Whats your favorite animal? But this time was different. When she heard the young boys answer, she wondered if she had heard him correctly.",
       " Twenty-five years Dana had been waiting. She tried to be patient during that time but she hadnt always managed to be as patient as she'd like. But today the opportunity had finally come. The thing she always imagined would make her the happiest person in the world was about to happen. She didnt know why at this specific time she all of a sudden felt sick inside.",
      "There was a reason for her shyness. Everyone assumed it had always been there but she knew better. She knew the exact moment that the shyness began. It had been that fateful moment at the lake. There are just some events that do that to you.",
        "The wolves stopped in their tracks, sizing up the mother and her cubs. It had been over a week since their last meal and they were getting desperate. The cubs would make a good meal, but there were high risks taking on the mother Grizzly. A decision had to be made and the wrong choice could signal the end of the pack. Think of AI as a brain for machines!"
    ];
  
    const randomText =
      fakeResponses[Math.floor(Math.random() * fakeResponses.length)];

      const response = {
        text: async () => randomText
      };
      
    console.log(response.text());
    return response.text();
  }
  
  export default runChat;
  