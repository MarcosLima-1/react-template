# 📖 Padrões e Convenções do Projeto

Este documento centraliza as convenções, padrões e boas práticas que devem ser seguidas no desenvolvimento deste projeto. O objetivo é manter o código consistente, legível e de fácil manutenção.

---

## 📂 1. Nomenclatura

A consistência na nomenclatura é fundamental para a legibilidade do código.

-   **Nomes de Arquivos:** Use `kebab-case`.
    -   Exemplos: `use-disclosure.ts`, `navegation-header.tsx`, `query-keys.ts`.

-   **Componentes e Tipos:** Use `PascalCase`.
    -   Exemplos: `SplashScreen`, `GenericError`, `User`, `UserRole`.

-   **Funções, Hooks e Variáveis:** Use `camelCase`.
    -   Exemplos: `useToggle`, `createMockUser`, `queryClient`, `userPlanEnum`.

---

## 📝 2. Formulários com TanStack Form

Para a criação de formulários, utilizamos o **TanStack Form**, que oferece uma solução robusta, *headless* e *type-safe*.

### a. Hook `useAppForm`

Em vez de usar o `useForm` diretamente do TanStack, utilize nosso hook customizado `useAppForm`, que já vem pré-configurado com nossos componentes de formulário.

-   **Localização:** `src/modules/form`

```tsx
import { useAppForm } from "@/modules/form/app-form";
import { Field } from "@/modules/form/field";
import { loginSchema, LoginSchema } from "@/schemas/auth"; // Exemplo de schema Zod

export function LoginForm() {
    const Form = useAppForm({
        // Validadores do Zod para cada fase
        validators: {
            onChange: loginSchema,
            onMount: loginSchema,
            onSubmit: loginSchema,
        },
        // Valores padrão do formulário
        defaultValues: {
            email: "",
            password: "",
        },
        // Função a ser chamada no submit
        onSubmit: ({ value }) => {
            console.log(value);
            // Lógica de submit...
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                Form.handleSubmit();
            }}
            className="w-full space-y-2"
        >
            <Form.AppField
                name="email"
                children={(AppFields) => {
                    return (
                        <Field.Wrapper>
                            <Field.Label>Email: </Field.Label>
                            <AppFields.TextField maxLength={255} placeholder="seu@email.com" />
                            <Field.Error />
                        </Field.Wrapper>
                    );
                }}
            />
            <Form.AppField
                name="password"
                children={(AppFields) => {
                    return (
                        <Field.Wrapper>
                            <Field.Label>Senha: </Field.Label>
                            <AppFields.PasswordField />
                            <Field.Error />
                        </Field.Wrapper>
                    );
                }}
            />
            <Form.AppForm>
                <Form.SubmitButton className="mt-4 w-full">Entrar</Form.SubmitButton>
            </Form.AppForm>
        </form>
    );
}
```

### b. Estrutura de Campos (`Form.AppField`)

O hook `useAppForm` retorna o componente `AppField`, que deve ser usado para criar cada campo do formulário. Ele utiliza um *render prop* no `children` para dar acesso aos componentes de input (`TextField`, `PasswordField`, etc.).

-   **`<Field.Wrapper>`:** Agrupa o label, o input e a mensagem de erro.
-   **`<Field.Label>`:** A label associada ao campo.
-   **`<AppFields.*>`:** O componente de input (ex: `AppFields.TextField`).
-   **`<Field.Error>`:** Exibe a mensagem de erro de validação para o campo.

### c. Botão de Submit (`Form.SubmitButton`)

O botão de submit já vem com a lógica para desabilitar-se enquanto o formulário está sendo enviado. Ele deve ser envolvido por `<Form.AppForm>` para ter acesso ao estado do formulário.

---

## 📡 3. Comunicação com API (TanStack Query)

Toda a comunicação com a API (queries e mutations) deve ser feita utilizando o **TanStack Query**.

### Instância Global `queryClient`

Utilize sempre a instância global `queryClient`, que já possui um tratamento centralizado para exibir toasts de sucesso e erro.

-   **Localização:** `src/lib/tanstack-query/client.ts`

```ts
import { queryClient } from "@/lib/tanstack-query/client";
import { useQuery } from "@tanstack/react-query";

function fetchUsers() {
    // ... lógica de fetch
}

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    }, queryClient); // Passando o client global
}
```

---

## 📅 4. Manipulação de Datas com Day.js

Para qualquer manipulação de datas, utilize a instância customizada do **Day.js**. Ela já vem configurada com o idioma `pt-br` e plugins como `relativeTime`.

-   **Localização:** `src/lib/dayjs.ts`

```ts
// Exemplo de uso
import { dayjs } from "@/lib/dayjs";

const fiveDaysAgo = dayjs().subtract(5, "day").fromNow(); // "há 5 dias"
```

---

## 🔒 5. Variáveis de Ambiente (`env`)

As variáveis de ambiente são validadas e tipadas com **Zod** para garantir segurança e consistência.

-   **Localização:** `src/lib/env.ts`

**Regra:** Toda nova variável de ambiente DEVE ser adicionada ao `envSchema` em `src/lib/env.ts`.

```ts
// Exemplo de acesso à variável de ambiente
import { env } from "@/lib/env";

const apiUrl = env.VITE_API_URL;
```

---

## 🧬 6. Tipagem com Zod

Utilizamos **Zod** para centralizar a definição de tipos. Isso nos permite criar um schema único que serve como fonte da verdade para:

1.  Extrair tipos TypeScript (`z.infer`).
2.  Validar formulários.
3.  Validar respostas de API.

-   **Localização dos Schemas:** `src/schemas/`

```ts
import { z } from "zod";

// 1. Defina o schema
export const ProductSchema = z.object({
    id: z.string(),
    name: z.string().min(3),
    price: z.number().positive(),
});

// 2. Extraia o tipo
export type Product = z.infer<typeof ProductSchema>;

// 3. Use em formulários, APIs, etc.
```

---

## 🔄 7. Atualização do Cache do TanStack Query

Para atualizações otimistas ou modificações manuais no cache do TanStack Query, use nossas funções utilitárias baseadas em **Immer**. Elas permitem "mutar" o estado do cache de forma segura e imutável.

-   **Localização:** `src/utils/infinite-data/`

### `updateQueryItem` (para `useQuery`)

Use para modificar um item em uma query simples.

```ts
import { updateQueryItem } from "@/utils/infinite-data/update-query";

updateQueryItem({
    queryKey: ["products"],
    updater: (draft) => {
        // Encontre e modifique o item dentro do "draft"
        const product = draft.find(p => p.id === "123");
        if (product) {
            product.name = "Novo Nome";
        }
    },
});
```

### `updateInfiniteQueryItem` (para `useInfiniteQuery`)

Use para modificar um item dentro de uma query infinita.

```ts
import { updateInfiniteQueryItem } from "@/utils/infinite-data/update-infinite-query";

updateInfiniteQueryItem({
    queryKey: ["products"],
    updater: (page) => {
        // Encontre e modifique o item dentro de uma página do "draft"
        const product = page.items.find(p => p.id === "123");
        if (product) {
            product.inStock = false;
        }
    },
});
```

---

## 🎨 8. Componentes com Storybook

Todos os componentes de UI devem ter "stories" no **Storybook**. Isso nos ajuda a:

-   Desenvolver componentes de forma isolada.
-   Documentar visualmente seus casos de uso e variações.
-   Facilitar testes visuais e de regressão.

Crie um arquivo `*.stories.tsx` na pasta do componente para definir suas stories.
