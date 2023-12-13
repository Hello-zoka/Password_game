import React from 'react';

const apiKey = 'AIzaSyCSOfOZ0klTZfk-4K6qQEl_L8TeheloucA';

const countries_colours = [["navy", "saffron", 'white', 'green'], ["red", "white"], ["red", "green"], ["black", "yellow", 'red']]
const countries_locatoins = ['25.567888,76.043912', '35.571652,138.588855', '23.8348066,90.4661237', '53.164828,8.647197']
const id = Math.floor(Math.random() * 30) % countries_colours.length;
const location = countries_locatoins[id];
export const flag_colours = countries_colours[id];

function GoogleStreetView() {
    const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${location}`;

    return (
        <div>
            <p>Password must contain colour of this country's flag</p>
            <iframe
                width="400"
                height="300"
                frameBorder="0"
                style={{border: 0}}
                src={streetViewUrl}
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
            ></iframe>
        </div>

    );
}

export default GoogleStreetView;