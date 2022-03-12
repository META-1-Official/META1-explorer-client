import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';

// import components
import {LineChartCard} from '../../../components/Card';
import {Table} from '../../../components/Table';
import Loader from '../../../components/Loader/Loader';

// import helpers
import images from '../../../helpers/images';
import {
  addTotalFieldToJsonArry,
  parseGroupOrdersBook,
} from '../../../helpers/utility';

// import api
import {
  fetchAsset,
  fetchOrderBook,
  fetchGroupedOrderBook,
} from '../../../store/apis/explorer';

// import redux
import actions from '../../../store/actions';
import selectors from '../../../store/selectors';

const {fetchTicker} = actions;
const {getTicker, isFetchingTicker} = selectors;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 40px;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: white;
`;

const LineChartsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  justify-content: center;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  margin-left: 1%;
  margin-right: 1%;
`;

const ContainerHeader = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Market = React.memo(() => {
  // state
  const [precision, setPrecision] = useState();
  const [orderBook, setOrderBook] = useState();
  const [sellGroupedOrderBook, setSellGroupedOrderBook] = useState([]);
  const [buyGroupedOrderBook, setBuyGroupedOrderBook] = useState([]);

  // hooks
  const location = useLocation();
  const dispatch = useDispatch();

  // actions
  const fetchTickerData = (base, quote) => dispatch(fetchTicker(base, quote));

  // selectors
  const getTickerData = useSelector(getTicker);
  const isFetchingTickerData = useSelector(isFetchingTicker);

  // vars
  const m2 = location.pathname.split('/')[2];
  const m1 = location.pathname.split('/')[3];
  const sellOrdersHeader = [
    'Price',
    getTickerData?.base,
    getTickerData?.quote,
    `Total(${getTickerData?.quote})`,
  ];
  const buyOrdersHeader = [
    'Price',
    getTickerData?.quote,
    getTickerData?.base,
    `Total(${getTickerData?.quote})`,
  ];
  const groupOrdersHeader = ['Min', 'Max', `Total(${getTickerData?.quote})`];

  useEffect(() => {
    setAssetsData();
    setOrderBookData();
    setSellGroupedOrderBookData();
    setBuyGroupedOrderBookData();
    fetchTickerData(m1, m2);
  }, []);

  const getOrderRows = (type) => {
    if (orderBook) {
      const orders = type === 'sell' ? orderBook.asks : orderBook.bids;
      return addTotalFieldToJsonArry(orders)
        .map((order) => {
          return {
            Price: [Number(order.price).toFixed(precision?.base), 'plainText'],
            [getTickerData?.base]: [
              Number(order.base).toFixed(precision?.base),
              'plainText',
            ],
            [getTickerData?.quote]: [
              Number(order.quote).toFixed(precision?.quote),
              'plainText',
            ],
            [`Total(${getTickerData?.quote})`]: [
              Number(order.total).toFixed(precision?.base),
              'plainText',
            ],
          };
        })
        .sort((o1, o2) => {
          return (
            o2[`Total(${getTickerData?.quote})`][0] -
            o1[`Total(${getTickerData?.quote})`][0]
          );
        });
    } else return [];
  };

  const getGroupOrderRows = (type) => {
    const orders = type === 'sell' ? sellGroupedOrderBook : buyGroupedOrderBook;
    if (orders) {
      return parseGroupOrdersBook(orders, precision?.quote, precision?.base)
        .map((order) => {
          return {
            Min: [
              Number(order.min_price).toFixed(precision?.base),
              'plainText',
            ],
            Max: [
              Number(order.max_price).toFixed(precision?.base),
              'plainText',
            ],
            [`Total(${getTickerData?.quote})`]: [
              Number(order.total_for_sale).toFixed(precision?.base),
              'plainText',
            ],
          };
        })
        .sort((o1, o2) => {
          return (
            o2[`Total(${getTickerData?.quote})`][0] -
            o1[`Total(${getTickerData?.quote})`][0]
          );
        });
    } else return [];
  };

  const setAssetsData = async () => {
    const base = await fetchAsset(m1);
    const quote = await fetchAsset(m2);
    base &&
      quote &&
      setPrecision({
        base: base.data.precision,
        quote: quote.data.precision,
      });
  };

  const setOrderBookData = async () => {
    const orderBook = await fetchOrderBook({base: m1, quote: m2});
    setOrderBook(orderBook.data);
  };

  const setSellGroupedOrderBookData = async () => {
    const orderSellBook = await fetchGroupedOrderBook({base: m1, quote: m2});
    setSellGroupedOrderBook(orderSellBook.data);
  };

  const setBuyGroupedOrderBookData = async () => {
    const orderBuyBook = await fetchGroupedOrderBook({base: m2, quote: m1});
    setBuyGroupedOrderBook(orderBuyBook.data);
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <LineChartsWrapper>
          <LineChartCard
            title="CURRENT PRICE"
            number={getTickerData?.latest}
            icon={images['price']}
            isLoading={isFetchingTickerData}
          />
          <LineChartCard
            title="LAST ASK"
            number={getTickerData?.lowest_ask}
            icon={images['last-ask']}
            isLoading={isFetchingTickerData}
          />
          <LineChartCard
            title="LAST BID"
            number={getTickerData?.highest_bid}
            icon={images['last-bid']}
            isLoading={isFetchingTickerData}
          />
          <LineChartCard
            title={`${getTickerData?.base} VOLUME`}
            number={Math.floor(getTickerData?.base_volume)}
            icon={images['volume']}
            isLoading={isFetchingTickerData}
          />
          <LineChartCard
            title={`${getTickerData?.quote} VOLUME`}
            number={Math.floor(getTickerData?.quote_volume)}
            icon={images['volume']}
            isLoading={isFetchingTickerData}
          />
          <LineChartCard
            title="24 HS % CHANGE"
            number={getTickerData?.percent_change}
            icon={images['change-%']}
            isLoading={isFetchingTickerData}
          />
        </LineChartsWrapper>
      </StyledContainer>
      <ContainerHeader style={{marginTop: '20px'}}>Order book</ContainerHeader>
      <StyledContainer>
        <BlockWrapper>
          <Label>Sell Orders</Label>
          {getTickerData && (
            <Table
              headers={sellOrdersHeader}
              rows={getOrderRows('sell')}
            ></Table>
          )}
          {!orderBook && <Loader />}
        </BlockWrapper>
        <BlockWrapper>
          <Label>Buy Orders</Label>
          {getTickerData && (
            <Table headers={buyOrdersHeader} rows={getOrderRows('buy')}></Table>
          )}
          {!orderBook && <Loader />}
        </BlockWrapper>
      </StyledContainer>
      <ContainerHeader style={{marginTop: '20px'}}>
        Grouped order book
      </ContainerHeader>
      <StyledContainer>
        <BlockWrapper>
          <Label>Sell Orders Groups</Label>
          {getTickerData && sellGroupedOrderBook && precision && (
            <Table
              headers={groupOrdersHeader}
              rows={getGroupOrderRows('sell')}
            ></Table>
          )}
          {!sellGroupedOrderBook && <Loader />}
        </BlockWrapper>
        <BlockWrapper>
          <Label>Buy Orders Groups</Label>
          {getTickerData && buyGroupedOrderBook && precision && (
            <Table
              headers={groupOrdersHeader}
              rows={getGroupOrderRows('buy')}
            ></Table>
          )}
          {!buyGroupedOrderBook && <Loader />}
        </BlockWrapper>
      </StyledContainer>
    </PageWrapper>
  );
});

export default Market;
