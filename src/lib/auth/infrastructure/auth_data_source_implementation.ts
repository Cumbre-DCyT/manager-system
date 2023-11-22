import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import type { AuthDataSource, User } from '../domain';

export class AuthDataSourceImplementation implements AuthDataSource {
	protected supabase: SupabaseClient;

	constructor(supabase?: SupabaseClient) {
		this.supabase =
			supabase ?? createClient(env.PUBLIC_SUPABASE_URL ?? '', env.PUBLIC_SUPABASE_ANON ?? '');
	}

	async loginGoogle(): Promise<boolean> {
		const authResponse = await this.supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		return authResponse.error != null;
	}

	async logOut(): Promise<boolean> {
		const authResponse = await this.supabase.auth.signOut();
		if (authResponse.error !== null) return true;
		return false;
	}

	async checkUser(): Promise<User | null> {
		const supabaseUser = await this.supabase.auth.getUser();

		if (!supabaseUser.data.user) return null;

		const user: User = {
			email: supabaseUser.data.user.email!,
			id: supabaseUser.data.user.id!
		};

		return user;
	}
}
