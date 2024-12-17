import React from 'react';

const CancellationAndRefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">OJASS Cancellation and Refund Policy</h1>
      
      <p className="mb-8">
        The following outlines the terms and conditions governing ticket cancellations and refunds for OJASS, the official technical fest of NIT Jamshedpur. By purchasing a ticket for OJASS, you agree to these policies.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Ticket Pricing and Payment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The price payable for tickets is as stated on our official website or registration portal at the time of purchase.</li>
            <li>Payments are final, and once a ticket is purchased, no modifications to the ticket price will be entertained.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Ticket Collection and Distribution</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Collection of Tickets:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tickets will typically be available for collection at a designated location before the event.</li>
                <li>You must collect your ticket from the specified location and time, presenting valid proof of identity.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Alternative Distribution Methods:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>In some cases, tickets may be distributed via email, post, or other methods.</li>
                <li>Only the billing address or email address provided during purchase will be used for dispatch.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Ticket Verification</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upon receiving your ticket, check all details immediately.</li>
            <li>Any errors must be reported to the OJASS team within two working days or before the event, whichever is sooner.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Admission Rules</h2>
          <p className="mb-2">The event organizers and venue authorities reserve the right to:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Refuse admission to any individual without providing a refund.</li>
            <li>Require latecomers to wait for a convenient break in the event for admission.</li>
            <li>Deny re-admission to individuals who leave the venue during the event.</li>
            <li>Request individuals causing disruptions to leave the event.</li>
            <li>Make changes to advertised details, including speakers, event content, and schedules, up to and including the event day.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Event Cancellation, Postponement, or Alteration</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Cancellation or Rescheduling:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>If an event is canceled or rescheduled, reasonable efforts will be made to notify ticket holders.</li>
                <li>Notifications will be sent using the contact details provided during registration. However, we do not guarantee prior notification before the event date.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Refund Policy:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All ticket sales are final and non-refundable.</li>
                <li>No refunds will be provided for cancellations, postponements, delays, or alterations to the event.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Responsibility:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>OJASS organizers are not liable for any losses or damages arising from event cancellations, delays, or changes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Security and Conduct</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Tickets are issued subject to the venue&apos;s and OJASS organizer&apos;s rules and regulations.</li>
            <li>Breach of these rules or engaging in unacceptable behaviour (e.g., causing nuisance, damage, or injury) may result in ejection from the venue without a refund.</li>
            <li>Security searches may be conducted at the venue to ensure the safety of attendees.</li>
            <li>Lost or stolen tickets will not be replaced, and the organizers bear no responsibility for such incidents.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Ticket Restrictions</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Tickets may be restricted to a maximum number per individual, credit card, or household.</li>
            <li>If tickets are purchased in excess of the allowed limit, the organizers reserve the right to cancel the excess tickets without prior notice.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Data Sharing and Third-Party Services</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>By purchasing a ticket, you consent to your data being used for event-related communications.</li>
            <li>If external services like Zapier are used for ticket processing, your data may be shared with such third parties.</li>
            <li>OJASS organizers are not liable for how third-party services handle your data, and by agreeing to OJASS terms, you also agree to the respective terms of such services.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Loss of Personal Property</h2>
          <p>
            The venue, OJASS organizers, and associated third parties accept no responsibility for the loss or theft of personal belongings during the event.
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

export default CancellationAndRefundPolicy;
