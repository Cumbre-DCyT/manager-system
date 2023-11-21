import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthDataSource, User } from '../domain';

export class AuthDataSourceImplementation implements AuthDataSource {
	protected supabase: SupabaseClient;

	async loginGoogle(): Promise<boolean> {
		const authResponse = await this.supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		return authResponse.error != null;
	}
	logOut(): Promise<User> {
		throw new Error('Method not implemented.');
	}
	async checkUser(): Promise<User> {
		const supabaseUser = await this.supabase.auth.getUser();
		const user: User = {
			email: supabaseUser.data.user?.email ?? '',
			id: supabaseUser.data.user?.id ?? ''
		};

		return user;
	}
}
