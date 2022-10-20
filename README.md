## Choice of Package

Key packages:

1. next - Fast deployment and secure server to server communication avoid exposing API key to client side. Built in SSR easy to enable SEO.
2. antd - Easily create standard UI components, but complicated to customize.
3. axios - Easy to handling api call, response data is available as a JSON by default.
4. moment - Simple to parse, manipulate and display date/time, but it's a huge package.

## Potential Improvement

1. Pre-commit hook
2. Alternative date/time package like dayjs
3. Alternative UI package like react/bootstrap
4. Dynamic error handling
5. Test case
   ##### Unit test
   - render DoctorListItem based on doctors
   - render DoctorClinicHour and opening time is 24hr format
   - render BookingList for 14 days, tab name format should be DD/MM (Weekday)
   - render hard coded BookingTimeSlot and time display in 12hr format
   - BookingTimeSlot button is disabled when book slot is booked
   - render booking form when click on an available BookingTimeSlot
   - child elements can access booking context provider
   ##### Integration testing
   - when submit a new booking, it will call endpoint and return success/ fail status
   - when new booking success, the BookingTimeSlot button becomes disabled
   - when new booking failed, a error notification will show

## Production Consideration

1. Monitoring and analytics tool like datadog / mixpanel.
2. Loading time and performance.

## Assumptions

1. BookingList Tab is hard coded to render the next 14 days, can improve by having it stored in each doctor profile and will be able to disable dates when the clinic is closed.
2. timeSlots is hard coded, can improve by creating a function to render start and end slot depends on each doctor opening hour.
3. using momentjs instead of day js because the api booking start is saved as float which is more align with momentjs than dayjs which need to transform to string.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Visit it on production url: https://necktie-doctor-booking.vercel.app/
