let currentUser = null;

module.exports = {
    getCurrentUser : () => currentUser,
    setCurrentUser : (username) => currentUser = username 
}