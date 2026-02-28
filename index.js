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
    console.log(chalk.cyan(`\n🚀 Fetching GitHub trending repos (${options.duration}, limit: ${options.limit})\n`));
    
    const repos = await getTrendingRepos(options.duration, parseInt(options.limit));
    
    if (repos.length === 0) {
      console.log(chalk.yellow('No trending repositories found.'));
      return;
    }
    
    // Sort by stars (descending) - API already sorts but we double-check
    const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    // Prepare table data
    const tableData = [
      ['#', 'Repository', 'Language', '⭐ Stars', 'Description']
    ];
    
    sortedRepos.forEach((repo, index) => {
      const stars = repo.stargazers_count.toLocaleString();
      const repoName = `${repo.owner.login}/${repo.name}`;
      const language = repo.language || 'Unknown';
      const shortDesc = (repo.description || 'No description').substring(0, 60) + 
                       (repo.description && repo.description.length > 60 ? '...' : '');
      
      tableData.push([
        chalk.yellowBright(`${index + 1}`),
        chalk.cyanBright(repoName),
        chalk.greenBright(language),
        chalk.yellowBright(stars),
        shortDesc
      ]);
    });
    
    // Configure table
    const config = {
      columnDefault: {
        paddingLeft: 1,
        paddingRight: 2
      },
      drawHorizontalLine: (index, size) => {
        return index === 0 || index === 1 || index === size;
      }
    };
    
    // Render table
    const output = Table.table(tableData, config);
    console.log(output);
    
    // Add repo URLs
    console.log(chalk.gray('\n📎 URLs:'));
    sortedRepos.slice(0, 5).forEach((repo, index) => {
      console.log(`  ${index + 1}. ${chalk.blue(repo.html_url)}`);
    });
    
  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
    process.exit(1);
  }
});


program.parse();
