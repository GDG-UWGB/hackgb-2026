import { faCar, faBus, faBicycle, faTaxi, faPlane } from '@fortawesome/free-solid-svg-icons';

export const transportationData = [
    {
        id: 'driving',
        title: 'Driving & Parking',
        icon: faCar,
        content: `
            <p class="mb-4 text-lg">UW-Green Bay offers convenient, accessible visitor parking across campus:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Recommended Lots:</strong> For direct access to the <strong>Brown County STEM Innovation Center</strong> (where HackGB takes place), park in the visitor parking lot directly in front of the STEM Center (<a href="https://www.google.com/maps/search/?api=1&query=Brown+County+STEM+Innovation+Center+Parking" target="_blank" rel="noopener noreferrer" class="text-google-blue hover:underline">directions</a>) or in the <strong>Laboratory Sciences Lot</strong> (<a href="https://www.google.com/maps/search/?api=1&query=Laboratory+Sciences+Parking+Lot+UW+Green+Bay" target="_blank" rel="noopener noreferrer" class="text-google-blue hover:underline">directions</a>) located right across the street.</li>
                <li><strong>Virtual Permit System:</strong> UWGB uses virtual parking permits. Visitors do <strong>not</strong> need to obtain or pay for a permit unless parking on campus more than 5 times per semester. If needed, you can register your vehicle's license plate online for free.</li>
                <li><strong>Parking Rules:</strong> Ensure your license plate is clearly visible and facing the driving lane when parked, as enforcement vehicles scan plates automatically. ADA-accessible parking spaces are available in the lots directly adjacent to the building.</li>
            </ul>
        `
    },
    {
        id: 'public',
        title: 'Public Transit',
        icon: faBus,
        content: `
            <p class="mb-4 text-lg">Green Bay Metro bus services connect the campus with the wider community:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>#7 Lime Line:</strong> The primary bus route serving UW-Green Bay is the <strong>#7 Lime Line</strong>, connecting the campus directly to the downtown Green Bay Transit Center. Buses run regularly and stop near the STEM Innovation Center.</li>
                <li><strong>GBM On-Demand:</strong> Green Bay Metro offers a rideshare-style on-demand transit service. You can request a ride using the GBM On-Demand app for affordable direct travel to and from campus.</li>
                <li><strong>Free Student Passes:</strong> Currently enrolled UW-Green Bay students can obtain a free semester-long transit pass at the University Ticketing & Information Center in the Student Union. Simply present your student ID to ride for free.</li>
            </ul>
        `
    },
    {
        id: 'air',
        title: 'Air Travel',
        icon: faPlane,
        content: `
            <p class="mb-4 text-lg">For participants flying in from out of state:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Austin Straubel International Airport (GRB):</strong> The closest airport to campus, located approximately 12 miles (15–20 minutes) away in Green Bay. Taxis and rideshare services (Uber and Lyft) are readily available in the ground transportation area.</li>
                <li><strong>Appleton International Airport (ATW):</strong> Located 45 minutes south of campus in Appleton, WI. This is a great secondary option with competitive flights. We recommend arranging a rideshare or car rental in advance.</li>
                <li><strong>Connecting to Campus:</strong> Since there are no direct bus routes connecting GRB Airport directly to the campus, taking a rideshare (Uber/Lyft) or booking a local taxi is the most direct and convenient travel method.</li>
            </ul>
        `
    },
    {
        id: 'rideshare',
        title: 'Rideshare & Intercity',
        icon: faTaxi,
        content: `
            <p class="mb-4 text-lg">Options for intercity travelers and local drop-offs:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Intercity Buses:</strong> Regional lines (including Jefferson Lines, Greyhound, and Lamers Connect) arrive at the <strong>Green Bay Transit Center</strong> downtown (<a href="https://www.google.com/maps/search/?api=1&query=Green+Bay+Transit+Center" target="_blank" rel="noopener noreferrer" class="text-google-blue hover:underline">directions</a>). From there, you can board the #7 Lime Line bus to reach campus.</li>
                <li><strong>Designated Rideshare Zone:</strong> If arriving via Uber, Lyft, or taxi, you can be dropped off directly in front of the <strong>Brown County STEM Innovation Center</strong> entrance on Technology Way.</li>
                <li><strong>No Idling:</strong> To maintain safety and traffic flow, rideshare drivers should not idle in fire lanes, crosswalks, or bicycle paths.</li>
            </ul>
        `
    },
    {
        id: 'bicycle',
        title: 'Bicycle & Trails',
        icon: faBicycle,
        content: `
            <p class="mb-4 text-lg">Eco-friendly bike travel is encouraged with dedicated infrastructure:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Trail Connections:</strong> UW-Green Bay is accessible via several local bike paths, making it easy to cycle to campus from surrounding neighborhoods and parks.</li>
                <li><strong>Bike Racks:</strong> Secure outdoor bike racks are located directly outside the <strong>Brown County STEM Innovation Center</strong> as well as other major campus buildings.</li>
                <li><strong>Bicycle Repair Station:</strong> A public, self-service bike repair station equipped with an air pump, tire levers, and basic hand tools is available for all visitors near the entrance of the Kress Events Center.</li>
            </ul>
        `
    }
];
