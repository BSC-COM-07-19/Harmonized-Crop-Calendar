import React from "react";

// Functional component named Form
const Form = ({ getWeather }) => {
    // Return JSX for rendering a form
    return (
        // Form element with onSubmit event handler set to getWeather function
        <form onSubmit={getWeather} className="mb-4">
            {/* Container for form elements */}
            <div className="flex items-center justify-center">
                {/* Input field for entering city name */}
                <input type="text" name="city" placeholder="City..." className="border border-gray-300 rounded py-2 px-4 mr-2" />

                {/* Input field for entering country name */}
                <input type="text" name="country" placeholder="Country..." className="border border-gray-300 rounded py-2 px-4 mr-2" />

                {/* Submit button for triggering weather forecast retrieval */}
                <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Forecast Weather</button>
            </div>
        </form>
    );
};

// Export the Form component as the default export
export default Form;
