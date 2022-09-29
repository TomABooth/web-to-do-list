const SUPABASE_URL = 'https://qzjxjzoitkpoyrvazfle.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6anhqem9pdGtwb3lydmF6ZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0Njg2MTMsImV4cCI6MTk4MDA0NDYxM30.-YXcZyjlSS51RFUvLqaaH6lUZ31UitcwsGaDmxSze_E';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createItem(item) {
    return await client.from('lists').insert(item).single();
}
