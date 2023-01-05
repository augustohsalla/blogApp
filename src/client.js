import { createClient, setContextClient } from '@urql/svelte';

const client = createClient({
	url: 'https://graphql.fauna.com/graphql',
	fetchOptions: () => {
		const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;
		return {
			headers: { authorization: token ? `Bearer ${token}` : '' }
		};
	}
});

export default client;
