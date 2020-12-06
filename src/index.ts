import { app } from './app';

const port = 5555;

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
