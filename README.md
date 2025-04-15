# Personal Finance Visualizer

A modern web application built with Next.js to help visualize and track personal finances and expenses.

## Features

- 💰 Track expenses and transactions
- 📊 Visual representation of spending patterns
- 📱 Responsive design for all devices
- 🎯 Category-wise expense tracking
- 📅 Timeline view of transactions
- 💸 Real-time total expense calculation

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Charts**: Recharts
- **Language**: TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/garvsharrma/personal-finance-visualizer.git
```

2. Install dependencies:
```bash
cd personal-finance-visualizer
npm install
```

3. Run the development server:
```bash
npm run dev
```
4. Make sure to add your own .env.local file with the MongoDB URI:
```bash

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
personal-finance-visualizer/
├── src/
│   ├── components/     # React components
│   ├── app/           # Next.js app router
│   └── lib/           # Utility functions
├── public/            # Static assets
├── .env.local         # Environment variables
└── package.json       # Project dependencies
```

## Usage

1. Add transactions with amount, date, description, and category
2. View summary cards showing total expenses, top spending category, and recent transactions
3. Analyze spending patterns through interactive charts
4. Track expenses by category and timeline

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.