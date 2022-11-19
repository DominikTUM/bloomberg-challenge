import {Badge, Card, Divider, List, Skeleton, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useAppSelector} from '../hooks/hooks';
import MatchEntry from '../models/match-entry';
import MatchesService from '../services/matches';

export default function Matches() {
  const [matches, setMatches] = useState<MatchEntry[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const userId = useAppSelector((state) => state.token.id);

  const [page, setCurrentPage] = useState(0);

  const loadMore = async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    const entries = await MatchesService.getMatches(page);
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
          <List.Item key={item.matchId}>
            <div className='mid-wrapper-width' style={{width: '80%'}}>
              <Badge.Ribbon placement='start' text={item.security}>
                <Card title={`Transaction amount ${item.qty * item.price} €`}
                  size="default" className='mid-wrapper-width'>
                  {item.buyerId === userId?
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
