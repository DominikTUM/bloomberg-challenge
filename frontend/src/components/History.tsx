import {Badge, Card, Divider, List, Skeleton, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import BookEntry from '../models/book-entry';
import BookkeepingService from '../services/bookkeeping';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function History() {
  const [matches, setMatches] = useState<BookEntry[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [page, setCurrentPage] = useState(0);

  const loadMore = async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    const entries = await BookkeepingService.getHistory(page);
    setMatches((prev) => [...prev, ...entries]);
    if (entries.length < 20) {
      setHasMore(false);
    }
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return <>
    <InfiniteScroll
      dataLength={matches.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Skeleton paragraph={{rows: 1}} active />}
      endMessage={<Divider plain>No more orders</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List
        dataSource={matches}
        renderItem={(item) => (
          <List.Item key={item.orderId}>
            <div className='mid-wrapper-width' style={{width: '80%'}}>
              <Badge.Ribbon placement='start' text={item.security}>
                <Card title={(item.operation === 'add'? 'Added': 'Changed') +
                  ` transaction value of ${item.qty * item.price} €`}
                size="default" className='mid-wrapper-width'>
                  {item.side === 'buy'?
                  <Tag color="green">Buy</Tag>:
                  <Tag color="red">Sell</Tag>}
                  {item.qty} Shares @ {item.price} €
                </Card>
              </Badge.Ribbon>
            </div>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  </>;
}
