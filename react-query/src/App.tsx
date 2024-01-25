import React, { useEffect, useState } from "react";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  email: String;
  first_name: String;
  last_name: String;
  avatar: String;
}

function App() {
  const queryClient = useQueryClient();
  const addUser = async (user: User) => {
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });
    return await res.json();
  };
  const getUsers = async () => {
    const res = await fetch("https://reqres.in/api/users");
    return await res.json();
  };

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      console.log("After Success ", data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (query.isLoading) return <h1>Loading....</h1>;
  if (query.isError) return <h1>Error : {query.error.message}</h1>;

  console.log(query.data.data);

  if(mutation.isError) return <h1>{mutation.error?.message}</h1>

  return (
    <div className="App">
      <h1>hello</h1>
      {query.data?.data.map((user: User) => {
        return (
          <div key={user.id}>
            <p>{user.first_name + " " + user.last_name} </p>
            <p>{user.email} </p>
            <img src={user.avatar + ""} alt="" />
          </div>
        );
      })}

      <button
        disabled={mutation.isPending}
        onClick={() =>
          mutation.mutate({
            first_name: "Syed",
            last_name: "Javith",
            email: "syedjavith14@gmail.com",
            avatar:
              "https://lh3.googleusercontent.com/ppp/ABQzP7BT-A63KsQYWjX_SncvxAWtKW8RlvQeZT-LlrIJpW283lY_7d1oCG7aHVVkrzPjVK-95b7S5D_v5oWxEhN_kxh6uTh9o5LmQd-EOquC7Y-2rwFiH8T5O-3Hk0lqskg0RHjdKm23rLqPiu_0byIYVQJIVuuBpw-r5KU-TTrZJC-Wlh8PnO6u79Yz1V-PgsA_p2MmRAVNfPzkkXDdBFd4sXrc4CIz_q4P3sWJbhnVIOTav4VPV2-biErLN_w0M6XUPUfaKh-H3WawCkVTVEgSWczktRYsXzgC7fWlX5T2NH-oLeSXPqti74A7qOHkgBnV_sav7qK-k1uLus18sPacP20ZKmiMTGDmsmZhNcILRanZ3OkmaOG1361Cp5aZ1Q8OZBc0rTkyoD3rsEpth6WjPdjDXpv8W_ZnwtOaa1VLjfly7l54RbteS-Jo3eEIjB4n9n6_bxX_EiOS6y-vjpIIOs6zXaNfv3Iqf5Gwp3zOV7gOD7KdmxOPkZnfVbgOp8F0xk4WJkHC_TiKjMJgiRP3tpI5ENkV5deR40hiGzYmNv7znnaN5kVcqLy0zjk3ijkGy6BpyZroPdIiW1o-QCx5MGUOjpknPIa05ievs2TtT6dJweZdXVl2AsAbA-JMmzkaWgV1g3ehfKpq0zEd3T9eTdfUqXHtOL9shuOgBQ5F-_KBW36vDftU02FZNXEIgSGS7fdBruKbLNKBHgALt7U3EJUfo61zRAebW0xfOgGpKL18OYa99OsiiVqpnzoYFizBDrD9JqIo8IvKCHmmVm442G3B4IfOGp-cchnnm6OzvEKPmC1OneSRe52uU6Ay09bS61JdKF7oJTMytrVov9KXObMyxc8_DkF-NF6jQZNfg4_Ll__XVyyYN85QGw_i6P5hFdq8uAOs9yRl0pAz1VQ0bKYI7AjZc6J9V4DGEAAhC6JbS2R7iy33ietDf3J6=s124-c",
            id: 190,
          })
        }
      >
        Add User
      </button>
    </div>
  );
}

export default App;
