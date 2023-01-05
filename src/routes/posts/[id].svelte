
<script lang="js">
    import { queryStore, setContextClient, getContextClient, gql } from '@urql/svelte';
    import { page } from '$app/stores';
      import client from '../../src/client'
      setContextClient(client);
    const currentPost = queryStore({
        client: getContextClient(),
        query: gql`
      query GetPostById($id: ID!) {
        findPostByID(id: $id) {
          _id
          title
          content
          author {
            email
          }
        }
      }
    `,
   variables: { id: $page.params.id }
    })
  </script>
  
  {#if $currentPost.fetching}
  <p>Loading...</p>
  {:else}
  
  <h2>{$currentPost.data.findPostByID.title}</h2>
  <p>By <b>{currentPost.data.findPostByID.author.email}</b></p>
  <p>{$currentPost.data.findPostByID.content}</p>
  {/if}