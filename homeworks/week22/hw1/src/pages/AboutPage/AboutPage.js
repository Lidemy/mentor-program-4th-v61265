import styled from "styled-components";

const Meme = styled.img`
  width: 80%;
  height: 50%;
  margin-top: 2rem;
`;

export default function AboutPage() {
  return (
    <>
      <h1>About Me</h1>
      生菜，正在練習用 react 做部落格。
      <Meme src='https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.0-9/129622091_4955958677778025_5487173615913268757_o.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=p5CWpq-dEooAX_tcHTs&_nc_ht=scontent.fkhh1-1.fna&oh=d799209f2c70471119e3171d399f648d&oe=5FF92991' />
      <div>（圖片來源：迷因刻本）</div>
    </>
  );
}
