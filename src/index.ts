import { config } from 'dotenv';
import { getStockNews, getTopStockNews, defaultTopics } from '@steezy789/mcp-stock-news-api';

// 加载环境变量
config();

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

if (!apiKey) {
  console.error('请设置 ALPHA_VANTAGE_API_KEY 环境变量');
  process.exit(1);
}

async function main() {
  try {
    // 示例 1: 获取特斯拉和苹果的最新新闻
    console.log('\n获取特斯拉和苹果的最新新闻:');
    const techNews = await getStockNews({
      apiKey,
      tickers: ['TSLA', 'AAPL'],
      limit: 5
    });
    
    techNews.forEach(news => {
      console.log(`\n标题: ${news.title}`);
      console.log(`时间: ${news.time_published}`);
      console.log(`来源: ${news.source}`);
      console.log(`链接: ${news.url}`);
      if (news.ticker_sentiment) {
        news.ticker_sentiment.forEach(sentiment => {
          console.log(`股票 ${sentiment.ticker} 情感评分: ${sentiment.ticker_sentiment_score}`);
        });
      }
    });

    // 示例 2: 获取科技行业的热门新闻
    console.log('\n\n获取科技行业的热门新闻:');
    const techIndustryNews = await getStockNews({
      apiKey,
      topics: ['technology'],
      limit: 3
    });

    techIndustryNews.forEach(news => {
      console.log(`\n标题: ${news.title}`);
      console.log(`摘要: ${news.summary}`);
      console.log(`时间: ${news.time_published}`);
    });

    // 示例 3: 获取情感评分最高的新闻
    console.log('\n\n获取情感评分最高的新闻:');
    const topNews = await getTopStockNews({
      apiKey,
      limit: 3
    });

    topNews.forEach(news => {
      console.log(`\n标题: ${news.title}`);
      if (news.ticker_sentiment && news.ticker_sentiment.length > 0) {
        console.log(`主要股票: ${news.ticker_sentiment[0].ticker}`);
        console.log(`情感评分: ${news.ticker_sentiment[0].ticker_sentiment_score}`);
      }
    });

  } catch (error) {
    console.error('发生错误:', error);
  }
}

main();