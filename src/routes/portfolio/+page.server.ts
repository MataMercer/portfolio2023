import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import type { Database } from '$lib/types/supabase';

async function getProjects(supabase: SupabaseClient<Database>) {
	return await supabase.from('Projects').select();
}
type ProjectsResponse = Awaited<ReturnType<typeof getProjects>>;
export type ProjectsResponseSuccess = ProjectsResponse['data'];
export type ProjectsReponseError = ProjectsResponse['error'];

export const load = (async ({ locals: { supabase, getSession } }) => {
	// const res = await fetch('https://api.github.com/users/matamercer/repos');
	return {
		// apiData: await res.json()
		projects: (await getProjects(supabase)).data,
		projectsError: (await getProjects(supabase)).error
	};
}) satisfies PageServerLoad;
