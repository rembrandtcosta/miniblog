## Getting Started

First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[Deploy do projeto](miniblog-mocha.vercel.app/)


# Report do desafio técnico

Vou usar esse Readme para discutir as decisões que tomei durante a resolução do desafio. Bem como as minhas interpretações dos problemas propostos.

Optei por utilizar Mongodb como banco de dados por questões de familiaridade/facilidade.

Por questões de preferências pessoais, utilizei somente o que está disponível com a inicialização de um projeto em Next.js, além da dependência do Mongo. De fato, o `package.json` inclui somente a lib do mongo além das libs incluídas por padrão pelo setup que escolhi (Typescript/App router/ESLint/Tailwindcss). Tento sempre utilizar o mínimo de bibliotecas externas.

## Sobre o Next.js

Como mencionei, já havia tido alguma experiência com Next.js. Entretanto, percebi que desde o meu ultimo contato com o framework bastante coisas haviam mudado. Então, tomei a oportunidade para aprender mais sobre as novidades introduzidas no Next.js 13 e fiz o projeto utilizando o diretório `app/` e as novidades dessa versão.

## Sobre as estratégias de renderização

Dada a condição de utilizar o Next.js nesse projeto, tomei como um dos pontos mais importantes desse desafio a escolha da estratégia de renderização mais adequada para o problema, afinal, esse é o grande diferencial do Next em comparação com outros frameworks.

A renderização no lado do servidor tem como principais vantagens a velocidade em exibição do conteúdo para o cliente e o fato de ser ideal para SEO, pois os metadados das páginas estão incluídos no retorno do request (diferente de uma página renderizada do lado do cliente, que contem apenas um HTML vazio, alterado por Javascript, que não pode ser lido por robôs). Enquanto a renderização no lado do cliente é melhor para criar páginas com alta interatividade, estado, código que necessita chamadas para coisas específicas do cliente como 'window' e 'localStorage'.

Com isso em mente é possível agora tentar escolher uma ou mais estratégias adequadas para o problema em questão. Obviamente, a geração estática não funcionará, pois o conteúdo exibido muda de acordo com os requests feitos pela API. Uma escolha fácil seria gerar as páginas com os artigos inteiramente no servidor e retorná-las. Entretanto, para esse problema, a estratégia de [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#incremental-static-regeneration-getstaticprops-with-revalidate) me pareceu mais adequada.

Considerando que em um sistema como um blog o intervalo entre as atualizações talvez não seja tão frequente e a maioria do conteúdo permanecerá inalterado por um certo período de tempo, me pareceu uma boa escolha utilizar Incremental Static Regeneration.

Essa estratégia combina vantagens da geração do lado do servidor com a geração estática. Claro, existe a possibilidade de por algum tempo a página armazenada ficar desatualizada, entretanto, considerando um intervalo de atualização de um blog esse tempo não deve ser muito alto. Então, parece um trade-off interessante entre ter a informação absolutamente mais atual e e velocidade em que essa informação é exibida para os usuários.

De maneira similar, a mesma estratégia foi adotada para as paginas dos posts individuais.

Para os comentários, dada a necessidade de interação com o estado da aplicação (responder a um comentário, curtir um comentário, discutir um comentário, atualizar a contagem de curtidas) optei por fazer essas ações do lado do cliente. Mas, depois de implementar, talvez com mais tempo, tentaria fazer essas interações do lado do servidor.

