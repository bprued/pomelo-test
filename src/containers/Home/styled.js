import styled from 'styled-components'

export const HomeStyled = styled.div `
  padding: 2rem;
  height: 100%;
  .home-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
    .input {
      width: 20rem;
    }
  }
  .card-wrapper {
    height: calc(100% - 7rem);
    overflow: auto;
    .cards {
      margin: 0;
      .card {
        height: 20rem;
        width: 30rem;
        overflow: auto;
      }
    }
    .segment {
      border: none;
      width: 100%;
      height: 100%;
    } 
    .not-found {
      width: 100%;
      display: flex;
      font-size: 2em;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (max-width: 500px) {
    .home-header {
      flex-direction: column;
      margin-bottom: 1rem;
      .header {
        margin-bottom: 1rem;
      }  
    }
  }

  @media screen and (max-width: 768px) {
    .card-wrapper {
      .cards {
        .card {
          width: 24rem;
        }
      }
    } 
  }
`