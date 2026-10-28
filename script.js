function mockOperation(name, value, milliseconds, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
                return;
            }

            resolve(value);
        }, milliseconds);
    });
}

function loadUser(shouldFail = false) {
    return mockOperation(
        "loadUser",
        { id: 7, name: "Jordan" },
        300,
        shouldFail,
    );
}

function loadOrders(userId) {
    return mockOperation(
        "loadOrders",
        [
            { id: 101, userId, total: 25 },
            { id: 102, userId, total: 40 },
            { id: 103, userId, total: 15 },
        ],
        300,
    );
}

async function loadDashboard() {
    try {
        const user = await loadUser();

        const order = await loadOrders(user.id)

        const total = order.reduce((sum, order) => sum + order.total, 0)

        console.log(`User: ${user.name}`)
        console.log(`Order: ${order.length}`)
        console.log(`Total $${total.toFixed(2)}`)
    } catch (error) {
        console.error(`Dashboard failed to load: ${error.message}`)
    }
}

loadDashboard()