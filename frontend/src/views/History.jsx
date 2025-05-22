import Header from "../components/Header";
import { Chrono } from "react-chrono";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import { useEffect } from "react";
function History() {
  const items = [
    {
      title: "2020",
      cardTitle: "Abyride Established",
      cardSubtitle: "From a startup to a vision-driven enterprise.",
      cardDetailedText:
        "Abyride began its journey as a transportation startup in 2020, aiming to revolutionize ridesharing. Our mission was to provide a reliable, safe, and convenient way for people to travel, and we quickly gained trust through our seamless services. With a customer-first approach, Abyride built a solid foundation in the transportation industry.",
      media: {
        type: "IMAGE",
        source: {
          url: image1,
        },
      },
    },
    {
      title: "2022",
      cardTitle: "Expansion into Home Care Services",
      cardSubtitle: "Caring for your loved ones, always.",
      cardDetailedText:
        "In 2022, Abyride expanded into home care services, recognizing the need for trustworthy assistance at home. We launched elderly care, child care, and household cleaning solutions to ease the lives of our customers. By diversifying our offerings, we ensured that our platform became a dependable part of everyday life, catering to more personal needs.",
      media: {
        type: "IMAGE",
        source: {
          url: image2,
        },
      },
    },
    {
      title: "2023",
      cardTitle: "Language Translation Services Launched",
      cardSubtitle: "Breaking barriers through communication.",
      cardDetailedText:
        "In 2023, Abyride introduced language translation services to connect people across cultures and languages. This included written and spoken translations, as well as real-time conversation assistance. With certified professionals, we aimed to make communication seamless for global travelers, businesses, and individuals alike, further solidifying Abyride as a multi-service platform.",
      media: {
        type: "IMAGE",
        source: {
          url: image3,
        },
      },
    },
    {
      title: "2024",
      cardTitle: "Depannage Services Introduced",
      cardSubtitle: "Roadside assistance you can trust.",
      cardDetailedText:
        "In 2024, Abyride launched depannage services to provide emergency roadside assistance. From towing to flat tire changes and urgent repairs, we made sure our users were covered in times of need. This new addition cemented Abyride’s reputation as a comprehensive platform with subdomains in transportation, home care, communication, and now vehicle assistance, all aimed at easing your life.",
      media: {
        type: "IMAGE",
        source: {
          url: image4,
        },
      },
    },
  ];

  // each time the url or path change it changes the header name
  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",

      inline: "start",
    });
  }, []);

  return (
    <div>
      <Header title="Our History" />
      <div style={{ width: "100%", height: "980px" }}>
        <Chrono
          items={items}
          mode="VERTICAL_ALTERNATING"
          mediaHeight={350} // Adjust this value to your desired image height
          theme={{
            primary: "#2b5f60", // Sets the line color to green
            secondary: "white", // Sets the secondary color
            cardBgColor: "white", // Sets the card background color
            cardForeColor: "black", // Sets the card text color
            titleColor: "black", // Sets the title text color
            titleColorActive: "green", // Sets the active title text color
          }}
        />
      </div>
    </div>
  );
}

export default History;
