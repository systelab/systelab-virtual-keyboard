export const CustomMatchers = {
    toBeLocatedAs: () => {
        return {
            compare: (actual, expected, tolerance = 10) => {
                const result = {
                    pass: Math.abs(actual - expected) <= tolerance,
                    message: `Expected coordinate (${actual}) to be within ${tolerance} pixels of (${expected})`
                };
    
                if (!result.pass) {
                    result.message += `, but it was not. Actual difference: ${Math.abs(actual - expected)}`;
                }
    
                return result;
            }
        };
    },
    toBeSizedAs: () => {
        return {
            compare: (actual, expected, tolerance = 5) => {
                const result = {
                    pass: Math.abs(actual - expected) <= tolerance,
                    message: `Expected dimension (${actual}) to be within ${tolerance} pixels of (${expected})`
                };
    
                if (!result.pass) {
                    result.message += `, but it was not. Actual difference: ${Math.abs(actual - expected)}`;
                }
    
                return result;
            }
        };
    },
};
