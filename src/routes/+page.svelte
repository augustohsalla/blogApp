<script lang="js">
     import { queryStore, setContextClient, getContextClient, gql } from '@urql/svelte';
    import client from '../client'

    setContextClient(client);

  const policy = { requestPolicy: 'network-only' }
  const size = 100;

  $: allPosts = queryStore({
    client: getContextClient(),
    query: gql`
    query GetAllPosts($size: Int!, $cursor: String) {
      listPosts(_size: $size, _cursor: $cursor) {
        data {
          _id
          title
          author {
            email
          }
        }
      }
    }
  `,
    variables: { size, policy }
  });
</script>

<h1>Posts</h1>

{#if $allPosts.fetching}
<p>Loading...</p>
{:else if $allPosts.error}
<p>Oh no... {$allPosts.error.message}</p>
{:else}

{#each $allPosts.data.listPosts.data as post}

<div class="post-wrap">
  <a href={`/posts/${post._id}`}>
    <div>{post.title}</div>
  </a>
  <span>by {post.author.email}</span>
</div>

{/each}

{/if}

<style>
  .post-wrap {
    margin-bottom: 1rem;
  }
</style>