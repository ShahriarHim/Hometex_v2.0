import { FaBus, FaSubway, FaCar, FaTaxi } from "react-icons/fa";

const TravelOptions = () => {
  const travelOptions = [
    {
      id: 1,
      icon: <FaBus className="text-4xl" />,
      title: "Bus",
      steps: [
        "Go to the nearest bus stop.",
        "Check the bus schedule.",
        "Board the bus towards your destination.",
        "Pay the fare.",
        "Get off at your stop."
      ],
    },
    {
      id: 2,
      icon: <FaSubway className="text-4xl" />,
      title: "Metro",
      steps: [
        "Find the nearest metro station.",
        "Buy a ticket or use a travel card.",
        "Board the metro train.",
        "Follow the route map to your destination.",
        "Exit at your stop."
      ],
    },
    {
      id: 3,
      icon: <FaCar className="text-4xl" />,
      title: "Car",
      steps: [
        "Get your car or rent one.",
        "Use a GPS to find the best route.",
        "Drive safely towards your destination.",
        "Park at a designated parking spot.",
        "Pay any parking fees if required."
      ],
    },
    {
      id: 4,
      icon: <FaTaxi className="text-4xl" />,
      title: "Taxi",
      steps: [
        "Call a taxi service or use a ride-hailing app.",
        "Wait for the taxi to arrive.",
        "Provide the driver with your destination.",
        "Pay the fare.",
        "Exit the taxi at your destination."
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">How to Get to Your Destination</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {travelOptions.map((option) => (
          <div key={option.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              {option.icon}
            </div>
            <h2 className="text-xl font-semibold mb-4">{option.title}</h2>
            <ul className="list-disc pl-5">
              {option.steps.map((step, index) => (
                <li key={index} className="mb-2">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelOptions;
