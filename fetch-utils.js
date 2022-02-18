const SUPABASE_URL = 'https://hogsvwpywyaxkjlqavnk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZ3N2d3B5d3lheGtqbHFhdm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNDE0MjgsImV4cCI6MTk1OTkxNzQyOH0.WAiLrZ3mwONCOVJiPp_a-AERLY-_YjL2j4b7vkU6QwQ';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createNeed(need) {
    const response = await client

        .from('need')
        .insert({
            need: need,
            complete: false,
            user_id: client.auth.user().id,
        })
        .single();
    return checkError(response);    
}

export async function deleteList(){
    const response = await client
        .from('todos')
        .delete()
        .match({ user_id: client.auth.user().id, });    
    return checkError(response);        
}

export async function getNeed() {
    const response = await client
        .from('need')
        .select()
        .order('complete')
        .match({ user_id: client.auth.user().id, });
    return checkError(response);
}

export async function completeNeed(id) {
    const response = await client
        .from('need')
        .update({ complete: true })
        .match({
            user_id: client.auth.user().id,
            id: id,
        });
    return checkError(response);    
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
