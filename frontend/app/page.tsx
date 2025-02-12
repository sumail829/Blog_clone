import Card from "@/components/card";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import TrendingTopics from "@/components/trendingtopics";
import Image from "next/image";



export default function Home() {


const cardData=[
  {
      title:" Lyft launching cross-platform service this week",
      description:"Like so many organizations these days, Autodesk is a company transition. It was until recently a traditional boxed software companyv selling licenses. Yet its own business model disruption is only part of the story.",
      imgsrc:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      imgalt:"card-image"

  },
  {
      title:" Lyft launching cross-platform service this week",
      description:"Like so many organizations these days, Autodesk is a company transition. It was until recently a traditional boxed software companyv selling licenses. Yet its own business model disruption is only part of the story.",
      imgsrc:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      imgalt:"card-image"

  },
  {
      title:" Lyft launching cross-platform service this week",
      description:"Like so many organizations these days, Autodesk is a company transition. It was until recently a traditional boxed software companyv selling licenses. Yet its own business model disruption is only part of the story.",
      imgsrc:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
      imgalt:"card-image"

  }
]

  return (
    <div className="mx-36">
       {/* <Navbar></Navbar> */}
       {/* <Hero></Hero> */}
       <TrendingTopics></TrendingTopics>
       <Card></Card>
    </div>
  );
}
