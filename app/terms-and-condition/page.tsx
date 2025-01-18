'use client';

import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">OJASS 2025 Terms and Conditions by Digicraft</h1>
      
      <p className="mb-8">
        These Terms and Conditions outline the rules and guidelines for participation, access, and conduct during OJASS 2025, the official technical fest of NIT Jamshedpur, operated by Digicraft. By using our website, registering for events, or attending the fest, you agree to abide by the terms set forth below. Please read them carefully before proceeding.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>OJASS Services: Refers to the activities, events, workshops, exhibitions, and other initiatives organized during the fest, whether online or offline.</li>
            <li>Visitor: Any individual attending OJASS events without registering for competitions or activities.</li>
            <li>Participant: Any individual registered to compete or participate in OJASS activities, events, or workshops.</li>
            <li>Organizer: Refers to Digicraft and the OJASS team, including coordinators, volunteers, and staff managing the fest.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Participation in most events is open to current undergraduate or postgraduate students.</li>
            <li>High school students may attend or participate with written consent from a parent or guardian.</li>
            <li>Professionals or non-students may register for events explicitly designated as open to all.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Services Provided</h2>
          <p className="mb-2">OJASS offers opportunities for participation in various activities, including:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Competitions and Events: A wide range of technical, cultural, and skill-based competitions for registered participants.</li>
            <li>Workshops and Seminars: Pre-scheduled workshops requiring prior registration and limited seats.</li>
            <li>Exhibitions: Showcases of technology and innovation open to all attendees.</li>
            <li>Accommodation: Limited temporary accommodation for outstation participants.</li>
            <li>Prize Distribution: Prizes for winners as per event-specific criteria.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Prohibited Activities</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Using the service for any illegal purpose</li>
            <li>Attempting to interfere with the proper functioning of the service</li>
            <li>Bypassing any security features of the service</li>
            <li>Sharing account credentials with third parties</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 mb-4">
            The Service and its original content, features, and functionality are owned by 
            Digicraft and are protected by international copyright, trademark, patent, 
            trade secret, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="text-gray-700 mb-4">
            We may terminate or suspend your account and access to the Service immediately, 
            without prior notice, for any reason, including breach of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            In no event shall Digicraft be liable for any indirect, incidental, special, 
            consequential, or punitive damages arising out of or relating to your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            Digicraft reserves the right to modify or replace these Terms at any time. We will provide 
            notice of any changes by posting the new Terms on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p className="mb-2">For queries or concerns, reach out to the OJASS team at:</p>
          <ul className="list-none space-y-2">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:ojass@nitjsr.ac.in" className="text-blue-600 hover:underline">
                ojass@nitjsr.ac.in
              </a>
            </li>
            <li><strong>Phone:</strong> +91-8863832703</li>
            <li><strong>Location:</strong> NIT Jamshedpur, Adityapur, Jamshedpur, Jharkhand - 831014</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Disclosure</h2>
          <p>
            To the extent required or permitted by law, OJASS may also collect, use and disclose personal information in connection with security related or law enforcement investigations or in the course of cooperating with authorities or complying with legal requirements.
          </p>
        </section>

        <section className="mt-8">
          <p className="text-sm text-gray-600">
            Last updated: 17th December 2024
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
