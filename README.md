# IAG Employee Submitter

A simple app that takes employee details and submits it to the dummy rest api employee endpoint.

## To install
```bash
npm install
```

## To run in development
```bash
npm start
```

## To test
```bash
npm run test
```

## To build
```bash
npm run build
```

## Demo
https://iag-work-sample.surge.sh/

## Problems overcome
I found that I couldn't make requests from a browser to the actual Dummy Rest API endpoint because it doesn't supply any CORS headers. In lieu of this I've left code in `create-employee.ts` that shows how I _would_ do this, but in practice I've stubbed this out with some code that simply returns a random ID.

## What I didn't get to
Keeping in mind that this is only supposed to take four hours, I didn't quite get to:
- More testing: I wrote two examples so you can see how I'd do the rest of it
- Accessibility - unfortunate, but doing this properly takes a long time
- Browser testing except on the latest versions of Chrome and Firefox
- More advanced material UI stuff, like a proper ripple on the button
