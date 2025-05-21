import React, { useState } from 'react';

const HealthAssistant = () => {
    const [symptoms, setSymptoms] = useState('');
    const [response, setResponse] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentConfirmation, setAppointmentConfirmation] = useState('');

    const handleCheckSymptoms = () => {
        const minorIssues = {
            "headache": {
                advice: "You may have a mild headache. Drink plenty of water, get some rest, and avoid screen time.",
                homeRemedy: "Try applying a cold compress on your forehead or massaging your temples gently.",
            },
            "cold": {
                advice: "You might have a common cold. Drink warm fluids like tea or soup, and rest.",
                homeRemedy: "Try gargling warm saltwater or inhaling steam from hot water to ease congestion.",
            },
            "stomach pain": {
                advice: "This could be indigestion or mild stomach discomfort. Drink warm water and avoid heavy meals.",
                homeRemedy: "Try sipping ginger tea or chewing on fennel seeds for relief.",
            }
        };

        if (symptoms.trim()) {
            const inputSymptoms = symptoms.toLowerCase().split(',').map(s => s.trim());
            let responses = [];

            inputSymptoms.forEach(symptom => {
                let issue = minorIssues[symptom];
                if (issue) {
                    responses.push(`
                        <strong>${symptom.toUpperCase()}:</strong><br>
                        ${issue.advice} <br>
                        ${issue.homeRemedy ? `Home Remedy: ${issue.homeRemedy}` : ''}
                        <br><br>
                    `);
                } else {
                    responses.push(`<strong>${symptom.toUpperCase()}:</strong><br>No advice available. Please consult a doctor.<br><br>`);
                }
            });

            responses.push("If symptoms persist, please consult a doctor.");
            setResponse(responses.join(''));
        } else {
            setResponse('Please enter your symptoms to get assistance.');
        }
    };

    const handleBookAppointment = () => {
        if (name.trim() && contact.trim() && appointmentDate.trim()) {
            setAppointmentConfirmation(
                `✅ Appointment booked successfully for ${name} on ${appointmentDate}. We will contact you at ${contact}.`
            );
            setName('');
            setContact('');
            setAppointmentDate('');
        } else {
            setAppointmentConfirmation('❌ Please fill in all details to book an appointment.');
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f9',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Health Assistant</h2>

            <div style={{ marginBottom: '30px' }}>
                <h3>Check Symptoms</h3>
                <input
                    type="text"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Enter your symptoms (e.g. headache, cold)"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                    }}
                />
                <button 
                    onClick={handleCheckSymptoms} 
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%'
                    }}>
                    Check Symptoms
                </button>
                <div 
                    dangerouslySetInnerHTML={{ __html: response }} 
                    style={{ marginTop: '15px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}
                />
            </div>

            <div>
                <h3>Book a Doctor's Appointment</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}
                />
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Your Contact (Phone or Email)"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}
                />
                <input
                    type="datetime-local"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}
                />
                <button 
                    onClick={handleBookAppointment} 
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%'
                    }}>
                    Book Appointment
                </button>
                {appointmentConfirmation && 
                    <p style={{ marginTop: '15px', color: appointmentConfirmation.includes('✅') ? 'green' : 'red' }}>
                        {appointmentConfirmation}
                    </p>
                }
            </div>
        </div>
    );
};

export default HealthAssistant;
