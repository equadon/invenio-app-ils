import json
from random import randint
from faker import Faker

fake = Faker()


author_full_names = set()


def generate(fun, count, unique=None):
    for _ in range(count):
        res = fun()
        if unique is not None:
            while res in unique:
                res = fun()
            unique.add(res)
        yield res


def identifier():
    return dict(
        scheme=fake.url(),
        value=fake.slug()
    )


def affiliation():
    identifiers = generate(identifier, randint(0, 3))
    return dict(
        name=fake.company(),
        identifiers=list(identifiers),
    )


def author():
    alternative_names = list(generate(fake.name, randint(0, 3)))
    roles = list(generate(fake.user_name, randint(0, 4)))
    identifiers = list(generate(identifier, randint(0, 3)))
    affiliations = list(generate(affiliation, randint(0, 3)))
    obj = dict(
        full_name=next(generate(fake.name, 1, unique=author_full_names)),
        type='PERSON',
    )
    if affiliations:
        obj['affiliations'] = affiliations
    if alternative_names:
        obj['alternative_names'] = alternative_names
    if roles:
        obj['roles'] = roles
    if identifiers:
        obj['identifiers'] = identifiers
    return obj


if __name__ == "__main__":
    authors = list(generate(author, 2000))
    with open('authors.json', 'w+') as f:
        f.write(json.dumps(authors))
