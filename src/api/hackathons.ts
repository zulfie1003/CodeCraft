// Hackathons API

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  date: string;
  prizes: string;
  image: string;
  tags: string[];
  isLive: boolean;
}

export const fetchHackathons = async (): Promise<Hackathon[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  return [
    {
      id: "1",
      title: "Global AI Challenge 2025",
      organizer: "OpenAI & Microsoft",
      date: "Oct 15 - 17, 2025",
      prizes: "$50,000 Pool",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      tags: ["AI/ML", "Generative AI"],
      isLive: true
    },
    {
      id: "2",
      title: "Web3 Builders Hack",
      organizer: "Ethereum Foundation",
      date: "Nov 01 - 03, 2025",
      prizes: "20 ETH",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      tags: ["Blockchain", "Solidity"],
      isLive: false
    },
    {
      id: "3",
      title: "Green Tech Summit",
      organizer: "Climate Change DAO",
      date: "Dec 10 - 12, 2025",
      prizes: "$25,000 Grant",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      tags: ["Sustainability", "IoT"],
      isLive: false
    }
  ];
};
