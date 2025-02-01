export const getCurrentTierImageSrc = (score) => {
    let tier = Math.trunc(score / 100);
    if (tier > 31) tier = 31;
    else if (tier < 0) tier = 0;

    return `/tiers/${tier}.svg`;
};
