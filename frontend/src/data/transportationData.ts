import { faCar, faBus, faBicycle, faTaxi } from '@fortawesome/free-solid-svg-icons';

export const transportationData = [
    {
        id: 'driving',
        title: 'Driving and parking',
        icon: faCar,
        content: `
            <p class="mb-4 text-lg">Free parking is available at the UW-Green Bay Campus:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Main Campus Parking Lot</strong> (<a href="#" class="text-google-blue hover:underline">directions</a>) is located near the main entrance off Nicolet Drive. Visitor parking is available throughout the main lots.</li>
                <li><strong>Student Union Lot</strong> (<a href="#" class="text-google-blue hover:underline">directions</a>) is available for closer access to the University Union. Special event parking might apply on high-traffic days.</li>
                <li><strong>ADA parking</strong> is available at all major lots across the UWGB campus. Additionally, ADA-accessible drop off zones are located near the main entrances of primary academic and event buildings.</li>
            </ul>
        `
    },
    {
        id: 'public',
        title: 'Public Transportation',
        icon: faBus,
        content: `
            <p class="mb-4 text-lg">Public transit is a convenient way to visit UW-Green Bay:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Green Bay Metro</strong> provides bus service throughout the city. Bus Route #8 and #9 directly serve the UWGB campus area.</li>
                <li><strong>Campus Stops:</strong> The main bus stop is located directly in front of the University Union. Track your bus in real-time using the Green Bay Metro app.</li>
                <li><strong>Regional Transit</strong> connects Green Bay to neighboring communities, with easy transfers to the campus lines.</li>
            </ul>
        `
    },
    {
        id: 'bicycle',
        title: 'Bicycle Parking',
        icon: faBicycle,
        content: `
            <p class="mb-4 text-lg">We encourage arriving by bicycle:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Extensive Trails:</strong> The UWGB campus is accessible via several local and regional bike trails, connecting easily to the surrounding Green Bay area.</li>
                <li><strong>Secure Bike Racks</strong> are located outside all major buildings, including the Cofrin Library, MAC Hall, and Student Union.</li>
                <li><strong>Repair Station:</strong> A self-service bike repair station with an air pump and basic tools is available near the entrance to the Kress Events Center.</li>
            </ul>
        `
    },
    {
        id: 'rideshare',
        title: 'Rideshare',
        icon: faTaxi,
        content: `
            <p class="mb-4 text-lg">Designated areas for rideshare services:</p>
            <ul class="list-disc pl-5 space-y-4 text-google-black/80 leading-relaxed">
                <li><strong>Main Drop-off:</strong> The designated rideshare drop-off and pick-up zone is located at the main roundabout (Phoenix Circle) near the University Union.</li>
                <li><strong>Alternative Zones:</strong> Additional drop-off points are available near external parking lots for specific buildings, such as the Weidner Center.</li>
                <li><strong>Wait Times:</strong> Please ask your driver to avoid idling in the crosswalks, bike lanes, or fire lanes while waiting.</li>
            </ul>
        `
    }
];
