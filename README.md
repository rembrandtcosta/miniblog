## Report do desafio técnico

Vou usar esse Readme para discutir as decisões que tomei durante a resolução do desafio. Bem como as minhas interpretações dos problemas propostos.

## Sobre o Next.js

Como mencionei, já havia tido alguma experiência com Next.js. Entretanto, percebi que desde o meu ultimo contato com o framework bastante coisas haviam mudado. Então, tomei a oportunidade para aprender mais sobre as novidades introduzidas no Next.js 13 e fiz o projeto utilizando o diretório `app/` e as novidades dessa versão.

## Sobre as estratégias de renderização

Dada a condição de utilizar o Next.js nesse projeto, tomei como um dos pontos mais importantes desse desafio a escolha da estratégia de renderização mais adequada para o problema, afinal, esse é o grande diferencial do Next em comparação com outros frameworks, então julgo que não faria sentido utilizar um framework e não tomar vantagem de suas principais funcionalidades.

Bom, entre essas estratégias temos:

- Static Site Generation (SSG)
    Em que o HTML é gerado no build do projeto e enviado a cada request.

- Server-Side Rendering (SSR)
    Em que o código HTML é gerado quando o request é feito. Essa estratégia é mais adequada para páginas mais dinamicas.

- Incremental Static Regeneration (ISR)
    Essa estratégia permite que páginas estáticas sejam criadas ou atualizadas após o build do projeto.

- Client-Side Rendering (CSR)
    A página é renderizada inteiramente no navegador com Javascript, assim como é feito em React.

As três primeiras estratégias são de renderização no lado do servidor, enquanto a última, obviamente, no lado do cliente. A renderização no lado do servidor tem como principais vantagens a velocidade em exibição do conteúdo para o cliente e o fato de ser ideal para SEO, pois os metadados das páginas estão incluidos no retorno do request (diferente de uma página renderizada do lado do cliente, que contem apenas um HTML vazio, alterado por Javascript, que não pode ser lido por robos). Enquanto a renderização no lado do cliente é melhor para criar páginas com alta interatividade, estados, código que necessita chamadas para coisas específicas do cliente como 'window' e 'localStorage'.

Ok, com isso em mente é possível agora tentar escolher uma ou mais estratégias adequadas para o problema em questão. Obviamente, a geração estática não funcionará pois o conteudo exibido muda de acordo com os requests feitos pela API. Uma escolha facíl seria gerar as páginas com os artigos inteiramente no servidor e retorná-las. Entretanto, para esse problema, a estratégia de Incremental Static Regeneration (ISR) me pareceu mais adequada.

Bom, basicamente, do que consiste a home do nosso blog? De páginas com links para os artigos. Supondo que todo o conteúdo do blog já estivesse escrito, poderiamos simplesmente gerar todas as páginas do blog como páginas estáticas. Mas, esse não é o caso, novos posts podem ser feitos e estes devem ser mostrados na home.

Felizmente, como comentei, existe uma estratégia chamada geração estática incremental, que permite que páginas estáticas sejam criadas após a build do projeto. Dessa forma, poderíamos criar as páginas quando requisitadas como páginas estáticas e, caso a mesma página seja requisitada novamente, simplesmente retornamos a página que já foi gerada pelo servidor.

Mas isso ainda não lida com o problema de como, uma vez gerada uma página estática, como essa seria atualizada. Isso não é um problema pois também é possivel atualizar páginas estáticas utilizando a geração incremental. Podemos definir um intervalo de tempo em que a página é revalidada. Ou seja, a página estática é criada e armazenada, para novos requests o Next verifica, passado algum tempo, se a página que ele tem em cache ainda é válida e caso a página esteja desatualizada, uma nova versão é gerada e retornada.

Essa estratégia combina vantagens da geração do lado do servidor com a geração estática. Claro, existe a possibilidade de por algum tempo a página armazenada ficar desatualizada, entretanto, considerando um intervalo de atualização de um blog esse tempo não deve ser muito alto. Então, parece um trade-off interessante entre ter a informação absolutamente mais atual e e velocidade em que essa informação é exibida para os usuários.



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
