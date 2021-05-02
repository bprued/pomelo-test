import { DetailStyled } from './styled'

const DetailPage = ({article}) => {

  /* NOTE the reason why using iframe: 
  the response from API in each article is not a full article as when click on url.
  So, I compare to show this detail page between the full website in iframe 
  or just an abstract and image(which can show in just one card from home page) 
  then I choose to show the full one in iframe because I feel that detail page
  should not waste user click to show just only what user can see in home page
  but bigger */

  return (
    <DetailStyled data-testid='detail-page'>
      <iframe data-testid='iframe' src={article.url} title={article.id}/>
    </DetailStyled>
  );
}

export default DetailPage;
