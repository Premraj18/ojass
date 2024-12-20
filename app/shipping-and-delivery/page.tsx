import React from 'react';

const ShippingAndDelivery = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Shipping and Delivery Policy for OJASS</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Ticket Distribution</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tickets may be collected at the venue</li>
            <li>Tickets may be sent electronically</li>
            <li>Choice of delivery method may be provided based on event requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Payment for Venue Tickets</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment can be made in advance via the OJASS platform</li>
            <li>Payment may be accepted at the venue, as decided by the organizers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Offline Ticketing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tickets may be distributed through retail partners (e.g., cafés)</li>
            <li>Offline tickets will be available alongside online availability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Ticket Formats</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Organizers can offer electronic tickets</li>
            <li>Paper tickets may be provided</li>
            <li>Both formats may be available based on convenience and requirements</li>
          </ul>
        </section>

        <section className="mt-12">
          <p className="text-center font-medium">
            By purchasing a ticket, you agree to these policies as set by the OJASS organizers.
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

export default ShippingAndDelivery; 