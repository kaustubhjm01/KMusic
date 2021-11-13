#include <bits/stdc++.h>
typedef long long int ll;
typedef long double ld;
#define tt    \
    int t;    \
    cin >> t; \
    while (t--)
#define floop(i, a, b) for (int i = a; i < b; i++)
#define floopd(i, a, b) for (int i = a; i >= b; i--)
#define nline cout << endl;
#define pb push_back
#define ppb pop_back
#define mp make_pair
#define ff first
#define ss second
#define set_bits _builtin_popcount11
#define tt    \
    int t;    \
    cin >> t; \
    while (t--)
using namespace std;
int N = 1e7;
vector<int> arr(N, 0);
void sieve()
{
    for (int i = 2; i * i <= N; i++)
    {
        if (arr[i] == 0)
        {
            for (int j = 2 * i; j <= N; j += i)
            {
                arr[j] = 1;
            }
        }
    }
}
void printsieve()
{
    for (int i = 2; i <= 40; i++)
    {
        if (arr[i] == 0)
        {
            cout << i;
        }
    }
    cout << endl;
}
void solve()
{
    ll a, b, c;
    cin >> a >> b >> c;
    if ((a + b + c) % 3 == 0)
    {
        cout << 0 << endl;
    }
    else
        cout << 1 << endl;
}
int main()
{
    // #ifndef ONLINE_JUDGE
    // freopen('input.txt', 'r', stdin);
    // freopen('output.txt', 'w', stdout);
    // #endif
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); // flushes cout
    tt
    {
        solve();
    }
}