import cp from 'child_process';

const trimNullableString = (target?: string): string => {
    if (target === null || target === undefined) {
        return target;
    }

    return (target + '').trim();
}

export async function ssh(command: string): Promise<string> {
    return new Promise((resolve, reject) => cp.exec(command, (_, out, err) => err ? reject(err) : resolve(out))).then(trimNullableString)
}