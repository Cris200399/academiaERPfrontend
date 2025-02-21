const getApiEndpoints = (baseUrl) => ({
    AUTH: `${baseUrl}/auth`,
    STUDENTS: `${baseUrl}/students`,
    GROUPS: `${baseUrl}/groups`,
    ASSISTANCE: `${baseUrl}/assistances`,
    GROUP_PAYMENT: `${baseUrl}/group-payments`,
    PAYMENTS_REPORTS: `${baseUrl}/payments-reports`,
    PRIVATE_CLASSES: `${baseUrl}/private-classes`,
    PRIVATE_CLASSES_PAYMENTS: `${baseUrl}/private-class-payments`,
    PRIVATE_CLASSES_AND_PAYMENTS: `${baseUrl}/private-class-and-payments`
});

export default getApiEndpoints;