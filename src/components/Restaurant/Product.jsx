import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import soup from '@assets/soup1.png';

import Add from '@assets/add.png';
import Delete from '@assets/delete.png';

import {useDispatch, useSelector} from 'react-redux';
import {addItemToBasket} from '../../redux/actions/Order';

const Product = ({setModal, item, setOpenItem}) => {
  const dispatch = useDispatch();
  const [itemInBasket, setItemInBasket] = useState(false);
  const basketItems = useSelector(({Order}) => Order.basketItems);
  useEffect(() => {
    setItemInBasket(basketItems.filter(itemB => itemB.guid === item.guid).length !== 0);
    // console.log(basketItems.filter(item => item.guid === item.guid).length !== 0)
  }, [basketItems])
  const handleClick = () => {
    if (item.modifier_groups) {
      console.log('item = ', item);
      setOpenItem(item);
      setModal(true)
    } else {
      dispatch(addItemToBasket(item));
    }
  }
  if (!item) return <div></div>
  return (
    <Wrapper url={item.image_urls}>
      <Cart itemInBasket={itemInBasket}>
        <Name>
          {item.name.ru}
        </Name>
        <Description>
          {item.ingredient_desc.ru}
        </Description>
        <Price>
          {item.portions[0].price} {item.portions[0].currency}
        </Price>
        <BottomContainer >
        {itemInBasket &&
          <CountContainer>
            <CountButton>
              <CountImage src={Delete}/>
            </CountButton>
            <CountValue>
              1
            </CountValue>
            <CountButton>
            <CountImage src={Add}/>
          </CountButton>
          </CountContainer> 
          }
          {!itemInBasket &&
            <Button onClick={() => handleClick()}>
              В корзину
            </Button>
          }
        </BottomContainer>
      </Cart>
    </Wrapper>
  )
}

export default Product;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountButton = styled.div`
  background: ${props => props.theme.primary};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s all;
  margin: 0 5px;
  :hover {
    transition: .2s all;
    background: ${props => props.theme.primaryDark};
  }
`;

const CountImage = styled.img`
  width: 15px;
`;

const CountValue = styled.div`
  font-weight: 500;
  font-size: 21px;
`;

const Wrapper = styled.div`
  box-shadow: 0px 4px 16px rgba(0,0,0,0.10);
  height: 285px;
  background-image: url("${props => props.url ? props.url : "https://diabetno.ru/wp-content/uploads/2020/07/pp_image_7236_22yecuiyctplaceholder.png"}");
  background-size: contain;
  border-radius: 5px;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  overflow: hidden;

  max-width: 400px;
  :hover {
    & > :first-child {
      //width: calc(100% + 1);
      transform: translate(0px);
      transition: .3s all;
    }
  }
  @media(max-width: 780px) {
    cursor: auto;
  }
`;

const Cart = styled.div`
  width: 100%;
  padding: 16px;
  //height: 100px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transform: translateY(57px);
  transition: .3s all;
  ${
    (props) => props.itemInBasket ? `
      transform: translateY(0);
      transition: none !important;
      border: 4px solid ${props.theme.primary};
      border-radius: 5px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-top: none;
    ` : ""
  }
  @media(max-width: 780px) {
    transform: translateY(0px);
  }
`;

const Name = styled.div`
  font-size: 20px;
  color: #080808;
  font-weight: bold;
`;

const Description = styled.div`
  //width: 100%;
  margin-top: 10px;
  display: flex;
  font-size: 12px;
  width: 370px;
  color: grey;
`;

const Price = styled.div`
  color: #080808;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
`;

const Button = styled.div`
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
  background: ${props => props.theme.primary};
  color: #fff;
  transition: .2s all;
  cursor: pointer;
  :hover {
    background: ${props => props.theme.primaryDark};
    transition: .2s all;
  }
  @media(max-width: 780px) {
    width: 100%;
    text-align: center;
  }
`;