// Supabase Configuration
// Create this file: config/supabase-config.js

const SUPABASE_URL = 'https://vyujnlivvaqybpxtpxpd.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_sMiT6wrvMepHIOCwF6q09g_xnQeoPde'

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Helper function to get current session
async function getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
}

// Helper function to get counsellor data
async function getCounsellorByLink(uniqueLink) {
    const { data, error } = await supabase
        .from('counsellors')
        .select('*')
        .eq('unique_link', uniqueLink)
        .eq('is_active', true)
        .single()
    
    if (error) throw error
    return data
}

// Export for use in other files
window.supabaseConfig = {
    supabase,
    getCurrentSession,
    getCounsellorByLink
}

console.log('Supabase initialized successfully')