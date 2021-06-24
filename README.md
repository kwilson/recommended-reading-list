# Recommended Reading List

## Running the app

### Dev

```bash
npm install
npm run dev
```

### Prod

```bash
npm install
npm run build
npm run start
```

## Notes/Improvements

### Framework
As I mentioned, I've not used Next.js much in the past (apart from testing out static site generation), so I thought I'd give it another try as part of this - always nice to use a coding excercise to learn new things.

The main improvements I'd make around that stack specifically is to switch to using SSR for the details page. I started off trying that but quickly realised that was going to take more time than I had. So I ended up just using basic loading-on-mount.

### Error handling
If this was a production app, I'd add in more user-friendly error handling around dealing with failed API calls. Either error boundary or specific actions on the page.

I'd probably lean more towards selective hiding of elements on error (a la Netflix) e.g. hiding the 'other books by this author' section completely if the call fails since it's not a critical path.

Again, out of scope for the time given for this.

### UI
Very rudimentary in styling. Could do with being wrapped in a component library to clean up the styles.

## Assumptions

### API
The single API endpoint isn't scalable or optimal, so I wrapped up calls to that in a local utils file. Depending on how this was going into production, I'd be looking to move that either into the API itself, or as an interceptor for the API.

I thought about trimming out the superflous fields not required for the UI, but have left them for now since the benefit is pretty negligable with the size of the data set.
