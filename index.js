#!/usr/bin/env node

const { Command } = require('commander');
const axios = require('axios');
const chalk = require('chalk');  // Keep this import
const Table = require('table');
const ora = require('ora');

const program = new Command();
program
  .name('github-trending')
  .description('CLI to fetch GitHub trending repositories')
  .version('1.0.0');

program.option('-d, --duration <type>', 'day|week|month|year', 'week');
program.option('-l, --limit <number>', 'number of repos', 10);

async function getTrendingRepos(duration, limit) {
  const now = new Date();
  let sinceDate;
  
  switch (duration.toLowerCase()) {
    case 'day':
      sinceDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case 'week':
      sinceDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      sinceDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'year':
      sinceDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      throw new Error('Invalid duration. Use: day, week, month, year');
  }

  const sinceStr = sinceDate.toISOString().split('T')[0];
  
  const spinner = ora('Fetching trending repos...').start();
  
  try {
    const url = `https://api.github.com/search/repositories?q=created:>${sinceStr}&sort=stars&order=desc&per_page=${limit}`;
    
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'github-trending-cli'
      }
    });
    
    spinner.succeed();
    return response.data.items;
    
  } catch (error) {
    spinner.fail();
    
    // FIXED: Chalk v5+ template literal syntax
    if (error.response?.status === 403) {
      console.error(chalk.red(`❌ GitHub API rate limit exceeded. Try again later.`));
      process.exit(1);
    }
    console.error(chalk.red(`❌ API request failed: ${error.message}`));
    process.exit(1);
  }
}

program.action(async (options) => {
  try {
    // FIXED: Proper Chalk v5+ syntax
    console.log(chalk.cyan(`\n🚀 Fetching GitHub trending repos (${options.duration}, limit: ${options.limit})\n`));
    
    const repos = await getTrendingRepos(options.duration, parseInt(options.limit));
    
    if (repos.length === 0) {
      console.log(chalk.yellow('No trending repositories found.'));
      return;
    }
    
    console.log(`${repos.length} trending repositories found!\n`);
    console.log(repos);  // Temporary raw output
    
  } catch (error) {
    // FIXED: Proper Chalk syntax
    console.error(chalk.red(`❌ Error: ${error.message}`));
    process.exit(1);
  }
});

program.parse();
